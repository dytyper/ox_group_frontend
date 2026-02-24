import { useEffect, useState } from 'react';

import { Card, Table, Typography } from 'antd';

import { fetchVariations } from '../api/variations';
import { productsColumns } from '../constants/columns/productsColumns';
import type { Variation } from '../types/variation';

const PAGE_SIZE = 10;

export default function ProductsPage() {
  const [data, setData] = useState<Variation[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => setLoading(true));

    fetchVariations(page, PAGE_SIZE)
      .then((res) => {
        if (!cancelled) {
          setData(res.items);
          setTotal(res.total_count);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [page]);

  return (
    <Card>
      <Typography.Title level={5} style={{ marginBottom: 16 }}>
        Товары
      </Typography.Title>
      <Table
        rowKey="id"
        columns={productsColumns}
        dataSource={data}
        loading={loading}
        locale={{ emptyText: loading ? '' : 'Ничего не найдено' }}
        pagination={{
          current: page,
          pageSize: PAGE_SIZE,
          total,
          showSizeChanger: false,
          showTotal: (t) => `Всего: ${t}`,
          onChange: setPage,
        }}
      />
    </Card>
  );
}
