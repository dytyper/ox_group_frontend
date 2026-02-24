import type { Variation } from '../types/variation';

export function getVariationDisplayName(variation: Variation): string {
  return variation.name ?? variation.supplier ?? variation.sku;
}