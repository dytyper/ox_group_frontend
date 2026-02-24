import type { VariationsResponse } from '../types/variation';
import { apiClient } from './client';

export async function fetchVariations(
  page: number = 1,
  size: number = 10
): Promise<VariationsResponse> {
  const { data } = await apiClient.get<VariationsResponse>('/variations', {
    params: { page, size },
  });

  return data;
}