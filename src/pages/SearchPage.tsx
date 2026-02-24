import { useMemo, useState } from 'react';

import { Card, Input, Table, Typography } from 'antd';

import { searchColumns } from '../constants/columns/searchColumns';
import type { SearchPageProps } from '../types/search';
import { filterAndSortByName } from '../utils/searchSort';

const PAGE_SIZE = 10;

export default function SearchPage({ items, loading }: SearchPageProps) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(
    () => filterAndSortByName(items, query),
    [items, query]
  );

  return (
    <Card>
      <Typography.Title level={5} style={{ marginBottom: 16 }}>
        Поиск товаров
      </Typography.Title>
      <Input.Search
        placeholder="Введите часть названия..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        allowClear
        style={{ marginBottom: 16, maxWidth: 400 }}
      />
      <Table
        rowKey="id"
        columns={searchColumns}
        dataSource={filtered}
        loading={loading}
        locale={{ emptyText: loading ? '' : 'Ничего не найдено' }}
        pagination={{
          pageSize: PAGE_SIZE,
          showSizeChanger: false,
          showTotal: (t) => `Найдено: ${t}`,
        }}
      />
    </Card>
  );
}
