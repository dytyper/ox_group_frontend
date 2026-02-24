import { useEffect, useState } from 'react';

import { fetchVariations } from '../api/variations';
import type { Variation } from '../types/variation';

import SearchPage from './SearchPage';

const SEARCH_PAGE_SIZE = 1000;

export default function SearchPageWrapper() {
  const [items, setItems] = useState<Variation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVariations(1, SEARCH_PAGE_SIZE)
      .then((res) => setItems(res.items))
      .finally(() => setLoading(false));
  }, []);

  return <SearchPage items={items} loading={loading} />;
}
