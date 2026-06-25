import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { formatMedia, strapiList, strapiOne } from '../lib/strapiResponse';
import { makeSlug } from '../lib/slugify';
import { parseFilters, parsePagination, parseSort } from '../lib/queryParser';

function formatCategory(cat: any, populate = false) {
  return {
    id: cat.id,
    documentId: cat.documentId,
    title: cat.title,
    slug: cat.slug,
    description: cat.description ?? null,
    image: populate ? formatMedia(cat.image) : undefined,
    banner_image: populate ? formatMedia(cat.bannerImage) : undefined,
    products: populate && cat.products
      ? cat.products.map((p: any) => ({ id: p.id, documentId: p.documentId, title: p.title, slug: p.slug }))
      : undefined,
    createdAt: cat.createdAt,
    updatedAt: cat.updatedAt,
  };
}

export async function listCategories(req: Request, res: Response, next: NextFunction) {
  try {
    const { filters, sort, pagination, populate } = req.query as any;
    const doPopulate = populate === '*' || populate === 'true';
    const where = filters ? parseFilters(filters) : {};
    const orderBy = sort ? parseSort(sort) : [{ createdAt: 'desc' }];
    const { skip, take, page, pageSize } = parsePagination(pagination ?? {});

    const include = doPopulate ? { image: true, bannerImage: true, products: { select: { id: true, documentId: true, title: true, slug: true } } } : undefined;

    const [items, total] = await Promise.all([
      prisma.category.findMany({ where, orderBy, skip, take, include }),
      prisma.category.count({ where }),
    ]);

    res.json(strapiList(items.map((c) => formatCategory(c, doPopulate)), total, page, pageSize));
  } catch (e) { next(e); }
}

export async function getCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { populate } = req.query as any;
    const doPopulate = populate === '*' || populate === 'true';
    const idParam = req.params.id;
    const where = isNaN(Number(idParam)) ? { documentId: idParam as string } : { id: Number(idParam) };
    const cat = await prisma.category.findFirst({
      where,
      include: doPopulate ? { image: true, bannerImage: true, products: { select: { id: true, documentId: true, title: true, slug: true } } } : undefined,
    });
    if (!cat) { res.status(404).json({ error: 'Not found' }); return; }
    res.json(strapiOne(formatCategory(cat, doPopulate)));
  } catch (e) { next(e); }
}

export async function createCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, description, slug, imageId, bannerImageId } = req.body;
    const finalSlug = slug || makeSlug(title);
    const cat = await prisma.category.create({
      data: { title, description, slug: finalSlug, imageId: imageId ?? null, bannerImageId: bannerImageId ?? null },
      include: { image: true, bannerImage: true },
    });
    res.status(201).json(strapiOne(formatCategory(cat, true)));
  } catch (e) { next(e); }
}

export async function updateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    const { title, description, slug, imageId, bannerImageId } = req.body;
    const cat = await prisma.category.update({
      where: { id },
      data: { title, description, slug, imageId: imageId ?? undefined, bannerImageId: bannerImageId ?? undefined },
      include: { image: true, bannerImage: true },
    });
    res.json(strapiOne(formatCategory(cat, true)));
  } catch (e) { next(e); }
}

export async function deleteCategory(req: Request, res: Response, next: NextFunction) {
  try {
    await prisma.category.delete({ where: { id: Number(req.params.id) } });
    res.json({ data: null });
  } catch (e) { next(e); }
}
