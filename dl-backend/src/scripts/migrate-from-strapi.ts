/**
 * One-time migration: Strapi SQLite → PostgreSQL via Prisma
 * Products linked to subcategories are re-linked to the subcategory's parent category.
 * Run: npx tsx src/scripts/migrate-from-strapi.ts
 */
import 'dotenv/config';
import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';
import prisma from '../prisma';

const DB_PATH = path.join(__dirname, '../../.tmp/data.db');
const OLD_UPLOADS = path.join(__dirname, '../../dl-backend-uploads-backup');
const NEW_UPLOADS = path.join(__dirname, '../../uploads');

const db = new Database(DB_PATH, { readonly: true });

function rows<T>(sql: string): T[] {
  return db.prepare(sql).all() as T[];
}

async function main() {
  console.log('Starting migration from Strapi SQLite...\n');

  // 1. Copy upload files and insert Upload records
  console.log('Migrating uploads...');
  const strapiFiles = rows<{ id: number; name: string; url: string; mime: string; size: number; width: number | null; height: number | null }>(
    `SELECT f.id, f.name, f.url, f.mime, f.size, f.width, f.height FROM files f`
  );

  const uploadIdMap: Record<number, number> = {};

  for (const f of strapiFiles) {
    const filename = path.basename(f.url);
    const src = path.join(OLD_UPLOADS, filename);
    const dest = path.join(NEW_UPLOADS, filename);
    if (fs.existsSync(src) && !fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
    }
    const upload = await prisma.upload.create({
      data: {
        name: f.name,
        url: `/uploads/${filename}`,
        mime: f.mime,
        size: f.size,
        width: f.width,
        height: f.height,
      },
    });
    uploadIdMap[f.id] = upload.id;
  }
  console.log(`  → ${strapiFiles.length} uploads migrated`);

  // 2. Migrate categories
  console.log('Migrating categories...');
  const strapiCats = rows<{ id: number; document_id: string; title: string; slug: string; description: string | null; created_at: string; updated_at: string }>(
    `SELECT id, document_id, title, slug, description, created_at, updated_at FROM categories`
  );

  // Category image links
  const catImages = rows<{ entity_id: number; file_id: number; field: string }>(
    `SELECT entity_id, file_id, field FROM files_related_morphs WHERE related_type = 'api::category.category'`
  );
  const catImageMap: Record<number, { image?: number; banner_image?: number }> = {};
  for (const r of catImages) {
    if (!catImageMap[r.entity_id]) catImageMap[r.entity_id] = {};
    if (r.field === 'image') catImageMap[r.entity_id].image = r.file_id;
    if (r.field === 'banner_image') catImageMap[r.entity_id].banner_image = r.file_id;
  }

  const categoryIdMap: Record<number, number> = {};
  for (const c of strapiCats) {
    const imgs = catImageMap[c.id] ?? {};
    const cat = await prisma.category.create({
      data: {
        documentId: c.document_id,
        title: c.title,
        slug: c.slug,
        description: c.description,
        imageId: imgs.image ? uploadIdMap[imgs.image] : null,
        bannerImageId: imgs.banner_image ? uploadIdMap[imgs.banner_image] : null,
        createdAt: new Date(c.created_at),
        updatedAt: new Date(c.updated_at),
      },
    });
    categoryIdMap[c.id] = cat.id;
  }
  console.log(`  → ${strapiCats.length} categories migrated`);

  // 3. Build subcategory → category map (so products get the right category)
  const subcats = rows<{ id: number; category_id: number }>(
    `SELECT s.id, sc.category_id FROM subcategories s
     LEFT JOIN subcategories_category_lnk sc ON sc.subcategory_id = s.id`
  );
  const subcatToCategoryId: Record<number, number> = {};
  for (const s of subcats) {
    if (s.category_id && categoryIdMap[s.category_id]) {
      subcatToCategoryId[s.id] = categoryIdMap[s.category_id];
    }
  }

  // 4. Migrate products
  console.log('Migrating products...');
  const strapiProducts = rows<{
    id: number; document_id: string; title: string; slug: string; description: string | null;
    rating: number | null; total_ratings: number | null; created_at: string; updated_at: string;
  }>(`SELECT id, document_id, title, slug, description, rating, total_ratings, created_at, updated_at FROM products`);

  // Product → subcategory link
  const prodSubcat = rows<{ product_id: number; subcategory_id: number }>(
    `SELECT product_id, subcategory_id FROM products_subcategory_lnk`
  );
  const prodSubcatMap: Record<number, number> = {};
  for (const r of prodSubcat) prodSubcatMap[r.product_id] = r.subcategory_id;

  // (product components are queried per-product below)

  const productIdMap: Record<number, number> = {};
  for (const p of strapiProducts) {
    const subcatId = prodSubcatMap[p.id];
    const categoryId = subcatId ? subcatToCategoryId[subcatId] : null;

    // Build JSON components from component tables
    const variantRows = rows<{ type: string; values: string | null }>(
      `SELECT pv.type, GROUP_CONCAT(pvv.value) as values
       FROM products_components pc
       JOIN product_variant pv ON pv.id = pc.component_id
       LEFT JOIN product_variant_values_str pvv ON pvv.id = pv.id
       WHERE pc.entity_id = ${p.id} AND pc.field = 'variants'
       GROUP BY pv.id, pv.type`
    );

    const coreSpecRows = rows<{ label: string; value: string }>(
      `SELECT slv.label, slv.value FROM products_components pc
       JOIN shared_label_values slv ON slv.id = pc.component_id
       WHERE pc.entity_id = ${p.id} AND pc.field = 'coreSpecifications'
       ORDER BY pc.order_field`
    );

    const elecSpecRows = rows<{ label: string; value: string }>(
      `SELECT slv.label, slv.value FROM products_components pc
       JOIN shared_label_values slv ON slv.id = pc.component_id
       WHERE pc.entity_id = ${p.id} AND pc.field = 'electricalSpecifications'
       ORDER BY pc.order_field`
    );

    const keyFeatureRows = rows<{ value: string }>(
      `SELECT sta.value FROM products_components pc
       JOIN shared_text_arrays sta ON sta.id = pc.component_id
       WHERE pc.entity_id = ${p.id} AND pc.field = 'keyFeatures'
       ORDER BY pc.order_field`
    );

    const daigramRow = rows<{ file_id: number | null; description: string | null }>(
      `SELECT smb.description, smb.media_id as file_id FROM products_components pc
       JOIN shared_media_boxes smb ON smb.id = pc.component_id
       WHERE pc.entity_id = ${p.id} AND pc.field = 'daigram'
       LIMIT 1`
    )[0] ?? null;

    const product = await prisma.product.create({
      data: {
        documentId: p.document_id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        rating: p.rating ?? 0,
        totalRatings: p.total_ratings,
        categoryId: categoryId ?? null,
        variants: variantRows.map((v) => ({
          type: v.type,
          values: v.values ? v.values.split(',') : [],
        })),
        coreSpecifications: coreSpecRows,
        electricalSpecifications: elecSpecRows,
        keyFeatures: keyFeatureRows.map((r) => ({ value: r.value })),
        daigram: daigramRow
          ? { imageId: daigramRow.file_id ? uploadIdMap[daigramRow.file_id] ?? null : null, description: daigramRow.description } as object
          : undefined,
        createdAt: new Date(p.created_at),
        updatedAt: new Date(p.updated_at),
      },
    });
    productIdMap[p.id] = product.id;

    // Gallery
    const galleryFiles = rows<{ file_id: number; order: number }>(
      `SELECT file_id, order_field as \`order\` FROM files_related_morphs
       WHERE related_type = 'api::product.product' AND entity_id = ${p.id} AND field = 'gallery'
       ORDER BY order_field`
    );
    for (const g of galleryFiles) {
      const uploadId = uploadIdMap[g.file_id];
      if (uploadId) {
        await prisma.productGallery.create({ data: { productId: product.id, uploadId, order: g.order } });
      }
    }
  }
  console.log(`  → ${strapiProducts.length} products migrated`);

  // 5. Migrate contacts
  console.log('Migrating contacts...');
  const strapiContacts = rows<{ id: number; document_id: string; name: string; email: string | null; phone: string; message: string | null; product_name: string | null; created_at: string }>(
    `SELECT id, document_id, name, email, phone, message, product_name, created_at FROM contacts`
  );
  for (const c of strapiContacts) {
    await prisma.contact.create({
      data: {
        documentId: c.document_id,
        name: c.name,
        email: c.email,
        phone: c.phone,
        message: c.message,
        productName: c.product_name,
        createdAt: new Date(c.created_at),
      },
    });
  }
  console.log(`  → ${strapiContacts.length} contacts migrated`);

  console.log('\nMigration complete!');
}

main().then(() => { db.close(); prisma.$disconnect(); }).catch((e) => { console.error(e); process.exit(1); });
