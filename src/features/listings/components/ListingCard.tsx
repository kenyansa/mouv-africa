import { Heart, MapPin, Star } from 'lucide-react';
import type { Listing } from '../listing.types';

interface ListingCardProps {
  place: Listing;
  isSaved: boolean;
  onSave: () => void;
  onSelect: () => void;
}

export function ListingCard({ place, isSaved, onSave, onSelect }: ListingCardProps) {
  return (
    <article className="group cursor-pointer" onClick={onSelect}>
      <div className="relative aspect-[1.08] overflow-hidden rounded-2xl bg-[#e5ebe2]">
        <img
          src={place.image}
          alt={place.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          onClick={(event) => {
            event.stopPropagation();
            onSave();
          }}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#193f32] backdrop-blur transition hover:scale-105"
          aria-label={isSaved ? 'Remove from saved' : 'Save listing'}
        >
          <Heart size={17} fill={isSaved ? '#cf6a4c' : 'none'} color={isSaved ? '#cf6a4c' : 'currentColor'} />
        </button>
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#193f32]">
          {place.tag}
        </span>
      </div>
      <div className="pt-4">
        <div className="flex justify-between gap-3">
          <div>
            <h3 className="font-bold text-[#193f32]">{place.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-[#78847c]">
              <MapPin size={13} />
              {place.city}
            </p>
          </div>
          <span className="flex items-center gap-1 text-sm font-semibold text-[#193f32]">
            <Star size={14} fill="#cf6a4c" color="#cf6a4c" />
            {place.rating}
          </span>
        </div>
        <p className="mt-3 text-sm text-[#68756d]">
          <span className="font-semibold text-[#193f32]">${place.price}</span> night{' '}
          <span className="mx-1">·</span> {place.guests} guests
        </p>
      </div>
    </article>
  );
}
