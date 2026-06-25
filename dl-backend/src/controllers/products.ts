import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { formatMedia, strapiList, strapiOne } from '../lib/strapiResponse';
import { makeSlug } from '../lib/slugify';
import { parseFilters, parsePagination, parseSort } from '../lib/queryParser';

function formatProduct(p: any, populate = false) {
  return {
    id: p.id,
    documentId: p.documentId,
    title: p.title,
    slug: p.slug,
    description: p.description ?? null,
    rating: p.rating,
    totalRatings: p.totalRatings ?? null,
    dimension: p.dimension ?? null,
    installationSteps: p.installationSteps ?? null,
    accessories: p.accessories ?? null,
    sketch: p.sketch ?? null,
    descriptions: p.descriptions ?? [],
    category: populate && p.category ? { id: p.category.id, documentId: p.category.documentId, title: p.category.title, slug: p.category.slug } : undefined,
    gallery: populate && p.gallery
      ? p.gallery.sort((a: any, b: any) => a.order - b.order).map((g: any) => formatMedia(g.upload))
      : undefined,
    createdAt: p.createdAt,
    updatedAt: p.updatedAt,
  };
}

const populateInclude = {
  category: true,
  gallery: { include: { upload: true }, orderBy: { order: 'asc' as const } },
};

export async function listProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const { filters, sort, pagination, populate } = req.query as any;
    const doPopulate = populate === '*' || populate === 'true';
    const where = filters ? parseFilters(filters) : {};
    const orderBy = sort ? parseSort(sort) : [{ createdAt: 'desc' as const }];
    const { skip, take, page, pageSize } = parsePagination(pagination ?? {});

    const [items, total] = await Promise.all([
      prisma.product.findMany({ where, orderBy, skip, take, include: doPopulate ? populateInclude : undefined }),
      prisma.product.count({ where }),
    ]);

    res.json(strapiList(items.map((p) => formatProduct(p, doPopulate)), total, page, pageSize));
  } catch (e) { next(e); }
}

export async function getProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const { populate } = req.query as any;
    const doPopulate = populate === '*' || populate === 'true';
    const idParam = req.params.id;
    const where = isNaN(Number(idParam)) ? { documentId: idParam as string } : { id: Number(idParam) };
    const p = await prisma.product.findFirst({ where, include: doPopulate ? populateInclude : undefined });
    if (!p) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(strapiOne(formatProduct(p, doPopulate)));
  } catch (e) { next(e); }
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      title, description, slug, rating, totalRatings, categoryId,
      dimension, installationSteps, accessories, sketch, descriptions,
      galleryIds,
    } = req.body;

    const finalSlug = slug || makeSlug(title);

    const product = await prisma.product.create({
      data: {
        title, description, slug: finalSlug,
        rating: rating ?? 0,
        totalRatings: totalRatings ?? null,
        categoryId: categoryId ?? null,
        dimension: dimension ?? null,
        installationSteps: installationSteps ?? null,
        accessories: accessories ?? null,
        sketch: sketch ?? null,
        descriptions: descriptions ?? [],
        gallery: galleryIds?.length
          ? { create: galleryIds.map((id: number, i: number) => ({ uploadId: id, order: i })) }
          : undefined,
      },
      include: populateInclude,
    });

    res.status(201).json(strapiOne(formatProduct(product, true)));
  } catch (e) { next(e); }
}

export async function updateProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const {
      title, description, slug, rating, totalRatings, categoryId,
      dimension, installationSteps, accessories, sketch, descriptions,
      galleryIds,
    } = req.body;

    if (galleryIds !== undefined) {
      await prisma.productGallery.deleteMany({ where: { productId: id } });
      if (galleryIds.length > 0) {
        await prisma.productGallery.createMany({
          data: galleryIds.map((uid: number, i: number) => ({ productId: id, uploadId: uid, order: i })),
        });
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(slug !== undefined && { slug }),
        ...(rating !== undefined && { rating }),
        ...(totalRatings !== undefined && { totalRatings }),
        ...(categoryId !== undefined && { categoryId }),
        ...(dimension !== undefined && { dimension }),
        ...(installationSteps !== undefined && { installationSteps }),
        ...(accessories !== undefined && { accessories }),
        ...(sketch !== undefined && { sketch }),
        ...(descriptions !== undefined && { descriptions }),
      },
      include: populateInclude,
    });

    res.json(strapiOne(formatProduct(product, true)));
  } catch (e) { next(e); }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    await prisma.product.delete({ where: { id: Number(req.params.id) } });
    res.json({ data: null });
  } catch (e) { next(e); }
}
