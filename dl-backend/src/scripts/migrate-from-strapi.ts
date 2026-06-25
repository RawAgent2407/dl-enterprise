/**
 * One-time migration: Strapi SQLite → PostgreSQL via Prisma
 * Products linked to subcategories are re-linked to the subcategory's parent category.
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

  // 1. Uploads
  console.log('Migrating uploads...');
  const strapiFiles = rows<{ id: number; name: string; url: string; mime: string; size: number; width: number | null; height: number | null }>(
    `SELECT id, name, url, mime, size, width, height FROM files`
  );

  const uploadIdMap: Record<number, number> = {};
  for (const f of strapiFiles) {
    const filename = path.basename(f.url);
    const src = path.join(OLD_UPLOADS, filename);
    const dest = path.join(NEW_UPLOADS, filename);
    if (fs.existsSync(src) && !fs.existsSync(dest)) fs.copyFileSync(src, dest);
    const upload = await prisma.upload.create({
      data: { name: f.name, url: `/uploads/${filename}`, mime: f.mime, size: f.size, width: f.width, height: f.height },
    });
    uploadIdMap[f.id] = upload.id;
  }
  console.log(`  → ${strapiFiles.length} uploads migrated`);

  // 2. Categories
  console.log('Migrating categories...');
  const strapiCats = rows<{ id: number; document_id: string; title: string; slug: string; description: string | null; created_at: string; updated_at: string }>(
    `SELECT id, document_id, title, slug, description, created_at, updated_at FROM categories
     WHERE id IN (SELECT MAX(id) FROM categories GROUP BY document_id)`
  );

  // Category images via files_related_mph (uses related_id, not entity_id)
  const catImages = rows<{ related_id: number; file_id: number; field: string }>(
    `SELECT related_id, file_id, field FROM files_related_mph WHERE related_type = 'api::category.category'`
  );
  const catImageMap: Record<number, { image?: number; banner_image?: number }> = {};
  for (const r of catImages) {
    if (!catImageMap[r.related_id]) catImageMap[r.related_id] = {};
    if (r.field === 'image') catImageMap[r.related_id].image = r.file_id;
    if (r.field === 'banner_image') catImageMap[r.related_id].banner_image = r.file_id;
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
        imageId: imgs.image ? (uploadIdMap[imgs.image] ?? null) : null,
        bannerImageId: imgs.banner_image ? (uploadIdMap[imgs.banner_image] ?? null) : null,
        createdAt: new Date(c.created_at),
        updatedAt: new Date(c.updated_at),
      },
    });
    categoryIdMap[c.id] = cat.id;
  }
  console.log(`  → ${strapiCats.length} categories migrated`);

  // 3. Subcategory → category map
  const subcats = rows<{ id: number; category_id: number }>(
    `SELECT s.id, sc.category_id FROM subcategories s
     LEFT JOIN subcategories_category_lnk sc ON sc.subcategory_id = s.id`
  );
  const subcatToCategoryId: Record<number, number> = {};
  for (const s of subcats) {
    if (s.category_id && categoryIdMap[s.category_id]) subcatToCategoryId[s.id] = categoryIdMap[s.category_id];
  }

  // 4. Products
  console.log('Migrating products...');
  const strapiProducts = rows<{
    id: number; document_id: string; title: string; slug: string; description: string | null;
    rating: number | null; total_ratings: number | null; created_at: string; updated_at: string;
  }>(`SELECT id, document_id, title, slug, description, rating, total_ratings, created_at, updated_at FROM products
      WHERE id IN (SELECT MAX(id) FROM products GROUP BY document_id)`);

  const prodSubcat = rows<{ product_id: number; subcategory_id: number }>(
    `SELECT product_id, subcategory_id FROM products_subcategory_lnk`
  );
  const prodSubcatMap: Record<number, number> = {};
  for (const r of prodSubcat) prodSubcatMap[r.product_id] = r.subcategory_id;

  const productIdMap: Record<number, number> = {};
  for (const p of strapiProducts) {
    const subcatId = prodSubcatMap[p.id];
    const categoryId = subcatId ? (subcatToCategoryId[subcatId] ?? null) : null;

    // Variants: products_cmps → components_product_variants → components_product_variants_cmps → components_shared_text_arrays
    const variantCmps = rows<{ cmp_id: number; type: string }>(
      `SELECT pc.cmp_id, cv.type FROM products_cmps pc
       JOIN components_product_variants cv ON cv.id = pc.cmp_id
       WHERE pc.entity_id = ${p.id} AND pc.field = 'variants'
       ORDER BY pc."order"`
    );
    const variantRows = variantCmps.map((vc) => {
      const values = rows<{ value: string }>(
        `SELECT sta.value FROM components_product_variants_cmps pvc
         JOIN components_shared_text_arrays sta ON sta.id = pvc.cmp_id
         WHERE pvc.entity_id = ${vc.cmp_id} AND pvc.field = 'values'
         ORDER BY pvc."order"`
      );
      return { type: vc.type, values: values.map((v) => v.value) };
    });

    // Core specs
    const coreSpecRows = rows<{ label: string; value: string }>(
      `SELECT slv.label, slv.value FROM products_cmps pc
       JOIN components_shared_label_values slv ON slv.id = pc.cmp_id
       WHERE pc.entity_id = ${p.id} AND pc.field = 'coreSpecifications'
       ORDER BY pc."order"`
    );

    // Electrical specs
    const elecSpecRows = rows<{ label: string; value: string }>(
      `SELECT slv.label, slv.value FROM products_cmps pc
       JOIN components_shared_label_values slv ON slv.id = pc.cmp_id
       WHERE pc.entity_id = ${p.id} AND pc.field = 'electricalSpecifications'
       ORDER BY pc."order"`
    );

    // Key features
    const keyFeatureRows = rows<{ value: string }>(
      `SELECT sta.value FROM products_cmps pc
       JOIN components_shared_text_arrays sta ON sta.id = pc.cmp_id
       WHERE pc.entity_id = ${p.id} AND pc.field = 'keyFeatures'
       ORDER BY pc."order"`
    );

    // Diagram: get media box id, then image from files_related_mph
    const daigramCmp = rows<{ cmp_id: number; description: string | null }>(
      `SELECT pc.cmp_id, smb.description FROM products_cmps pc
       JOIN components_shared_media_boxes smb ON smb.id = pc.cmp_id
       WHERE pc.entity_id = ${p.id} AND pc.field = 'daigram'
       LIMIT 1`
    )[0] ?? null;

    let daigramData: object | undefined = undefined;
    if (daigramCmp) {
      const daigramImg = rows<{ file_id: number }>(
        `SELECT file_id FROM files_related_mph
         WHERE related_type = 'shared.media-box' AND related_id = ${daigramCmp.cmp_id} AND field = 'media'
         LIMIT 1`
      )[0] ?? null;
      daigramData = {
        imageId: daigramImg ? (uploadIdMap[daigramImg.file_id] ?? null) : null,
        description: daigramCmp.description,
      };
    }

    const product = await prisma.product.create({
      data: {
        documentId: p.document_id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        rating: p.rating ?? 0,
        totalRatings: p.total_ratings,
        categoryId,
        descriptions: [],
        createdAt: new Date(p.created_at),
        updatedAt: new Date(p.updated_at),
      },
    });
    productIdMap[p.id] = product.id;

    // Gallery via files_related_mph
    const galleryFiles = rows<{ file_id: number; order: number }>(
      `SELECT file_id, "order" FROM files_related_mph
       WHERE related_type = 'api::product.product' AND related_id = ${p.id} AND field = 'gallery'
       ORDER BY "order"`
    );
    for (const g of galleryFiles) {
      const uploadId = uploadIdMap[g.file_id];
      if (uploadId) await prisma.productGallery.create({ data: { productId: product.id, uploadId, order: g.order } });
    }
  }
  console.log(`  → ${strapiProducts.length} products migrated`);

  // 5. Contacts
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
