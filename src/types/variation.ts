export interface Variation {
  id: number;
  sku: string;
  supplier: string;
  supplierId: number;
  category: string | null;
  barcode: string;
  lastUpdateTime: string;
  showMarket: boolean;
  uploadedImages: unknown[];
  technicalCard: boolean;
  importProperties: unknown[];
  name?: string;
}

export interface VariationsResponse {
  page: number;
  items: Variation[];
  total_count: number;
}
