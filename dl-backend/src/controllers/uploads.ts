import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma';
import { formatMedia } from '../lib/strapiResponse';
import { imageSize } from 'image-size';
import { uploadToS3 } from '../lib/s3';

export async function uploadFile(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.file) { res.status(400).json({ error: 'No file uploaded' }); return; }

    const url = await uploadToS3(req.file.buffer, req.file.originalname, req.file.mimetype);

    let width: number | undefined;
    let height: number | undefined;
    try {
      const dims = imageSize(req.file.buffer);
      width = dims.width;
      height = dims.height;
    } catch {}

    const upload = await prisma.upload.create({
      data: {
        name: req.file.originalname,
        url,
        mime: req.file.mimetype,
        size: req.file.size / 1024,
        width: width ?? null,
        height: height ?? null,
      },
    });

    res.status(201).json([formatMedia(upload)]);
  } catch (e) { next(e); }
}
