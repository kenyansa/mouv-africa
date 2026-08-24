import { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { getListings, searchListings } from './listing.service';
import type { Listing } from './listing.types';

interface UseListingsResult {
  listings: Listing[];
  loading: boolean;
  error: string | null;
}

export function useListings(searchTerm: string): UseListingsResult {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(searchTerm, 350);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const request = debouncedSearch.trim() ? searchListings(debouncedSearch) : getListings();

    request
      .then((result) => {
        if (!cancelled) setListings(result);
      })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load listings');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [debouncedSearch]);

  return { listings, loading, error };
}
