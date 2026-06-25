type Filters = Record<string, Record<string, string>>;

const OP_MAP: Record<string, string> = {
  $eq: 'equals',
  $ne: 'not',
  $lt: 'lt',
  $lte: 'lte',
  $gt: 'gt',
  $gte: 'gte',
  $contains: 'contains',
  $startsWith: 'startsWith',
  $endsWith: 'endsWith',
};

export function parseFilters(filters: Filters) {
  const where: Record<string, unknown> = {};
  for (const [field, ops] of Object.entries(filters)) {
    for (const [op, value] of Object.entries(ops)) {
      const prismaOp = OP_MAP[op];
      if (prismaOp) {
        where[field] = { [prismaOp]: value };
      }
    }
  }
  return where;
}

export function parseSort(sort: string | string[]) {
  const entries = Array.isArray(sort) ? sort : [sort];
  return entries.map((s) => {
    const [field, dir = 'asc'] = s.split(':');
    return { [field]: dir.toLowerCase() };
  });
}

export function parsePagination(pagination: Record<string, string>) {
  const page = parseInt(pagination?.page ?? '1', 10);
  const pageSize = parseInt(pagination?.pageSize ?? '25', 10);
  return { skip: (page - 1) * pageSize, take: pageSize, page, pageSize };
}
