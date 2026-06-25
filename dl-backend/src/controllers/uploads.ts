import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { formatMedia } from '../lib/strapiResponse';
import { imageSize } from 'image-size';
import fs from 'fs';
import path from 'path';

export async function uploadFile(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) { res.status(400).json({ error: 'No file uploaded' }); return; }

    const filePath = path.join(__dirname, '../../uploads', req.file.filename);
    let width: number | undefined;
    let height: number | undefined;
    try {
      const dims = imageSize(fs.readFileSync(filePath));
      width = dims.width;
      height = dims.height;
    } catch {}

    const upload = await prisma.upload.create({
      data: {
        name: req.file.originalname,
        url: `/uploads/${req.file.filename}`,
        mime: req.file.mimetype,
        size: req.file.size / 1024,
        width: width ?? null,
        height: height ?? null,
      },
    });

    res.status(201).json([formatMedia(upload)]);
  } catch (e) { next(e); }
}
