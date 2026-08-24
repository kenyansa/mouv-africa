import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BedDouble, Heart, MapPin, UserRound } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Button } from '../components/ui/Button';
import { getListingDetails } from '../features/listings/listing.service';
import type { Listing } from '../features/listings/listing.types';

export function ListingDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [place, setPlace] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    setLoading(true);

    getListingDetails(id)
      .then((result) => {
        if (!cancelled) setPlace(result);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f8f5]">
        <Header onSignInClick={() => navigate('/login')} />
        <div className="mx-auto max-w-[1320px] px-5 py-20 text-center text-[#68756d]">
          Loading stay…
        </div>
      </div>
    );
  }

  if (!place) {
    return (
      <div className="min-h-screen bg-[#f7f8f5]">
        <Header onSignInClick={() => navigate('/login')} />
        <div className="mx-auto max-w-[1320px] px-5 py-20 text-center text-[#68756d]">
          We couldn't find that stay.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      <Header onSignInClick={() => navigate('/login')} />
      <div className="mx-auto max-w-4xl px-5 py-10">
        <div className="overflow-hidden rounded-3xl bg-white">
          <div className="aspect-[16/8]">
            <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
          </div>
          <div className="grid gap-8 p-6 md:grid-cols-[1fr_240px] md:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#cf6a4c]">
                {place.tag}
              </p>
              <h1 className="display mt-2 text-4xl text-[#193f32]">{place.name}</h1>
              <p className="mt-2 flex items-center gap-1 text-[#68756d]">
                <MapPin size={15} />
                {place.city}
              </p>
              <p className="mt-6 leading-7 text-[#68756d]">{place.description}</p>
              <div className="mt-6 flex gap-5 text-sm font-semibold text-[#193f32]">
                <span className="flex items-center gap-2">
                  <BedDouble size={17} />
                  {place.beds} beds
                </span>
                <span className="flex items-center gap-2">
                  <UserRound size={17} />
                  {place.guests} guests
                </span>
              </div>
            </div>
            <div className="h-fit rounded-2xl border border-[#dfe5dc] p-5">
              <p>
                <strong className="text-2xl text-[#193f32]">${place.price}</strong>{' '}
                <span className="text-sm text-[#68756d]">/ night</span>
              </p>
              <Button variant="secondary" className="mt-5 w-full">
                Reserve stay
              </Button>
              <button
                onClick={() => setSaved((current) => !current)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#dfe5dc] py-3 text-sm font-bold text-[#193f32]"
              >
                <Heart size={16} fill={saved ? '#cf6a4c' : 'none'} />
                {saved ? 'Saved to your list' : 'Save for later'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
