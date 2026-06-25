import { Upload } from '@prisma/client';

export function formatMedia(upload: Upload | null | undefined) {
  if (!upload) return null;
  return {
    id: upload.id,
    documentId: `upload-${upload.id}`,
    url: upload.url,
    name: upload.name,
    mime: upload.mime,
    size: upload.size,
    width: upload.width ?? null,
    height: upload.height ?? null,
  };
}

export function strapiOne(data: Record<string, unknown>) {
  return { data };
}

export function strapiList(
  items: Record<string, unknown>[],
  total: number,
  page = 1,
  pageSize = 25,
) {
  return {
    data: items,
    meta: {
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil(total / pageSize),
        total,
      },
    },
  };
}
