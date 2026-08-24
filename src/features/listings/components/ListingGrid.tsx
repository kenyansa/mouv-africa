import { EmptyState } from '../../../components/ui/EmptyState';
import type { Listing } from '../listing.types';
import { ListingCard } from './ListingCard';
import { ListingSkeleton } from './ListingSkeleton';

interface ListingGridProps {
  listings: Listing[];
  loading: boolean;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelect: (listing: Listing) => void;
}

export function ListingGrid({ listings, loading, savedIds, onToggleSave, onSelect }: ListingGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        <ListingSkeleton />
        <ListingSkeleton />
        <ListingSkeleton />
      </div>
    );
  }

  if (!listings.length) {
    return <EmptyState title="No stays match that search." description="Try a different city or filter." />;
  }

  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((place) => (
        <ListingCard
          key={place.id}
          place={place}
          isSaved={savedIds.includes(place.id)}
          onSave={() => onToggleSave(place.id)}
          onSelect={() => onSelect(place)}
        />
      ))}
    </div>
  );
}
