import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { strapiList, strapiOne } from '../lib/strapiResponse';
import { parsePagination } from '../lib/queryParser';

function formatContact(c: any) {
  return {
    id: c.id,
    documentId: c.documentId,
    name: c.name,
    email: c.email ?? null,
    phone: c.phone,
    message: c.message ?? null,
    productName: c.productName ?? null,
    createdAt: c.createdAt,
  };
}

export async function listContacts(req: Request, res: Response, next: NextFunction) {
  try {
    const { pagination } = req.query as any;
    const { skip, take, page, pageSize } = parsePagination(pagination ?? {});
    const [items, total] = await Promise.all([
      prisma.contact.findMany({ skip, take, orderBy: { createdAt: 'desc' } }),
      prisma.contact.count(),
    ]);
    res.json(strapiList(items.map(formatContact), total, page, pageSize));
  } catch (e) { next(e); }
}

export async function createContact(req: Request, res: Response, next: NextFunction) {
  try {
    const { name, email, phone, message, productName } = req.body;
    const contact = await prisma.contact.create({ data: { name, email, phone, message, productName } });
    res.status(201).json(strapiOne(formatContact(contact)));
  } catch (e) { next(e); }
}

export async function deleteContact(req: Request, res: Response, next: NextFunction) {
  try {
    await prisma.contact.delete({ where: { id: Number(req.params.id) } });
    res.json({ data: null });
  } catch (e) { next(e); }
}
