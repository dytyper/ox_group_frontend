import type { ColumnsType } from 'antd/es/table';

import type { Variation } from '../../types/variation';
import { getVariationDisplayName } from '../../utils/common';

export const productsColumns: ColumnsType<Variation> = [
  { title: 'ID', dataIndex: 'id', width: 80 },
  { title: 'SKU', dataIndex: 'sku', ellipsis: true },
  { title: 'Поставщик', dataIndex: 'supplier', ellipsis: true },
  { title: 'Штрихкод', dataIndex: 'barcode' },
  {
    title: 'Название',
    key: 'name',
    render: (_, r) => getVariationDisplayName(r),
    ellipsis: true,
  },
  { title: 'Обновление', dataIndex: 'lastUpdateTime', width: 160 },
];
