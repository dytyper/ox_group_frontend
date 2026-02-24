import type { Variation } from '../types/variation';

import { getVariationDisplayName } from './common';

export function filterAndSortByName(
  items: Variation[],
  query: string
): Variation[] {
  const q = query.trim().toLowerCase();

  if (!q) {
    return [...items].sort((a, b) =>
      getVariationDisplayName(a).localeCompare(getVariationDisplayName(b))
    );
  }

  const withIndex = items
    .map((item) => {
      const name = getVariationDisplayName(item);
      const lower = name.toLowerCase();
      const pos = lower.indexOf(q);

      return { item, pos, name };
    })
    .filter((x) => x.pos !== -1);

  withIndex.sort((a, b) => {
    if (a.pos !== b.pos) {
      return a.pos - b.pos;
    }

    return a.name.localeCompare(b.name);
  });

  return withIndex.map((x) => x.item);
}
