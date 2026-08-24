import { SlidersHorizontal } from 'lucide-react';
import type { ListingCategory } from '../listing.types';
import { LISTING_CATEGORIES } from '../listing.utils';

interface ListingFiltersProps {
  active: ListingCategory;
  onChange: (category: ListingCategory) => void;
}

export function ListingFilters({ active, onChange }: ListingFiltersProps) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
        {LISTING_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
              active === category
                ? 'bg-[#193f32] text-white'
                : 'border border-[#dfe5dc] bg-white text-[#68756d] hover:border-[#193f32]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <button className="hidden items-center gap-2 rounded-full border border-[#d4ddd3] px-4 py-2 text-sm font-semibold text-[#193f32] sm:flex">
        <SlidersHorizontal size={16} /> Filters
      </button>
    </div>
  );
}
