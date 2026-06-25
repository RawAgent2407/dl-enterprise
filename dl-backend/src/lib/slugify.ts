import { transliterate } from 'transliteration';

export function makeSlug(text: string): string {
  return transliterate(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export async function uniqueSlug(
  base: string,
  exists: (slug: string) => Promise<boolean>,
  excludeId?: number,
): Promise<string> {
  let slug = makeSlug(base);
  let candidate = slug;
  let counter = 2;
  while (await exists(candidate)) {
    candidate = `${slug}-${counter++}`;
  }
  return candidate;
}
