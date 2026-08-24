import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { PageContainer } from '../components/layout/PageCountainer';
import { ListingFilters } from '../features/listings/components/ListingFilters';
import { ListingGrid } from '../features/listings/components/ListingGrid';
import { ListingSearch } from '../features/listings/components/ListingSearch';
import { useListings } from '../features/listings/listing.hooks';
import type { Listing, ListingCategory } from '../features/listings/listing.types';
import { filterByCategory } from '../features/listings/listing.utils';

export function ListingsPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ListingCategory>('All stays');
  const [saved, setSaved] = useState<string[]>([]);

  const { listings, loading } = useListings(query);

  const filtered = useMemo(
    () => filterByCategory(listings, activeCategory),
    [listings, activeCategory]
  );

  const toggleSaved = (id: string) =>
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );

  const openListing = (listing: Listing) => navigate(`/listings/${listing.id}`);

  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      <Header onSignInClick={() => navigate('/login')} />
      <PageContainer>
        <section className="relative overflow-hidden pb-12 pt-14 lg:pb-16 lg:pt-20">
          <div className="pointer-events-none absolute -right-20 top-4 h-64 w-64 rounded-full bg-[#e5efdf] blur-3xl" />
          <div className="relative max-w-3xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.22em] text-[#cf6a4c]">
              <span className="h-px w-7 bg-[#cf6a4c]" />
              Stay curious, stay local
            </p>
            <h1 className="display max-w-2xl text-5xl leading-[1.04] tracking-[-.04em] text-[#193f32] md:text-7xl">
              Find a place that feels <em className="text-[#cf6a4c]">like you.</em>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-[#68756d]">
              Thoughtful spaces, warm hosts, and the good kind of far away. Your next chapter starts
              here.
            </p>
          </div>
        </section>

        <ListingSearch query={query} onQueryChange={setQuery} />

        <section id="explore" className="pt-16">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[.18em] text-[#cf6a4c]">
                Handpicked for you
              </p>
              <h2 className="display text-3xl tracking-[-.03em] text-[#193f32] md:text-4xl">
                Explore stays with soul
              </h2>
            </div>
          </div>

          <ListingFilters active={activeCategory} onChange={setActiveCategory} />

          <ListingGrid
            listings={filtered}
            loading={loading}
            savedIds={saved}
            onToggleSave={toggleSaved}
            onSelect={openListing}
          />
        </section>

        <section
          id="about"
          className="mt-24 grid gap-8 border-t border-[#dfe5dc] pt-12 md:grid-cols-[1fr_2fr] md:items-start"
        >
          <p className="text-xs font-bold uppercase tracking-[.18em] text-[#cf6a4c]">
            The mouv approach
          </p>
          <div>
            <h2 className="display max-w-xl text-3xl leading-tight text-[#193f32]">
              Travel is better when it has a point of view.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#68756d]">
              We look for the places with a pulse: homes made personal, neighborhoods worth
              wandering, and hosts who know where the good coffee is.
            </p>
          </div>
        </section>
      </PageContainer>
    </div>
  );
}
