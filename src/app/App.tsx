import { useEffect, useMemo, useState } from 'react';
import {
  BedDouble,
  CalendarDays,
  Heart,
  MapPin,
  Menu,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  UserRound,
  X,
} from 'lucide-react';
import { getListings } from '../lib/api';
import type { Listing } from '../lib/types';
import { login, logout } from '../features/auth/auth.service';
import '../index.css';
import type { FormEvent } from 'react';
import type { User } from 'firebase/auth';

const categories = ['All stays', 'Apartments', 'Villas', 'Beachfront', 'Workspaces'];

function App() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All stays');
  const [selected, setSelected] = useState<Listing | null>(null);
  const [saved, setSaved] = useState<string[]>([]);
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<User | null>(() =>
    JSON.parse(localStorage.getItem('mouv-user') || 'null')
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getListings()
      .then(setListings)
      .finally(() => setLoading(false));
  }, []);
  const filtered = useMemo(
    () =>
      listings.filter((place) => {
        const haystack = `${place.name} ${place.city} ${place.type}`.toLowerCase();
        const categoryType = {
          Apartments: 'Apartment',
          Villas: 'Villa',
          Beachfront: 'Beachfront',
          Workspaces: 'Workspace',
        }[activeCategory];
        return (
          (!query || haystack.includes(query.toLowerCase())) &&
          (activeCategory === 'All stays' || place.type === categoryType)
        );
      }),
    [activeCategory, listings, query]
  );
  const toggleSaved = (id: string) =>
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  const handleLogin = async (email: string, password: string) => {
    const result = await login(email, password);
    setUser(result);
    localStorage.setItem('mouv-user', JSON.stringify(result));
    setAuthOpen(false);
  };
  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('mouv-user');
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-[#f7f8f5]">
      <header className="sticky top-0 z-30 border-b border-[#dfe5dc] bg-[#f7f8f5]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 lg:px-10">
          <a className="flex items-center gap-2 text-[#193f32]" href="#top">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d7e7d4]">
              <Sparkles size={18} />
            </span>
            <span className="text-xl font-bold tracking-[-.04em]">
              mouv<span className="text-[#cf6a4c]">.</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#5e6b63] md:flex">
            <a className="text-[#193f32]" href="#explore">
              Explore
            </a>
            <a href="#about">Our story</a>
            <a href="#host">Become a host</a>
          </nav>
          <div className="flex items-center gap-3">
            {user ? (
              <button
                onClick={handleLogout}
                className="hidden items-center gap-2 rounded-full border border-[#d4ddd3] px-4 py-2 text-sm font-semibold md:flex"
              >
                <UserRound size={16} /> Sign out
              </button>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="hidden rounded-full bg-[#193f32] px-5 py-2.5 text-sm font-semibold text-white md:block"
              >
                Sign in
              </button>
            )}
            <button
              className="grid h-10 w-10 place-items-center rounded-full border border-[#d4ddd3] md:hidden"
              aria-label="Open menu"
            >
              <Menu size={19} />
            </button>
          </div>
        </div>
      </header>
      <main id="top" className="mx-auto max-w-[1320px] px-5 pb-20 lg:px-10">
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
        <section className="relative z-10 -mb-1 flex flex-col gap-3 rounded-[20px] bg-white p-3 shadow-[0_18px_50px_rgba(35,58,42,.1)] md:flex-row md:items-center md:p-2">
          <label className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#f5f7f3]">
            <Search size={19} className="text-[#cf6a4c]" />
            <span className="w-full">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#193f32]">
                Where
              </span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-sm text-[#68756d] outline-none placeholder:text-[#a0aaa2]"
                placeholder="Search a city or stay"
              />
            </span>
          </label>
          <div className="hidden h-9 w-px bg-[#e5eae3] md:block" />
          <button className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-[#f5f7f3]">
            <CalendarDays size={19} className="text-[#cf6a4c]" />
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#193f32]">
                When
              </span>
              <span className="text-sm text-[#a0aaa2]">Add your dates</span>
            </span>
          </button>
          <button className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-[#f5f7f3]">
            <UserRound size={19} className="text-[#cf6a4c]" />
            <span>
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#193f32]">
                Guests
              </span>
              <span className="text-sm text-[#a0aaa2]">Add guests</span>
            </span>
          </button>
          <button
            className="grid h-12 place-items-center rounded-xl bg-[#cf6a4c] px-5 text-white transition hover:bg-[#b9563a]"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </section>
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
            <button className="hidden items-center gap-2 rounded-full border border-[#d4ddd3] px-4 py-2 text-sm font-semibold text-[#193f32] sm:flex">
              <SlidersHorizontal size={16} /> Filters
            </button>
          </div>
          <div className="hide-scrollbar mb-8 flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${activeCategory === category ? 'bg-[#193f32] text-white' : 'border border-[#dfe5dc] bg-white text-[#68756d] hover:border-[#193f32]'}`}
              >
                {category}
              </button>
            ))}
          </div>
          {loading ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          ) : filtered.length ? (
            <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((place) => (
                <ListingCard
                  key={place.id}
                  place={place}
                  isSaved={saved.includes(place.id)}
                  onSave={() => toggleSaved(place.id)}
                  onSelect={() => setSelected(place)}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[#cfd9cc] py-16 text-center text-[#68756d]">
              No stays match that search. Try a different city.
            </div>
          )}
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
      </main>
      {selected && (
        <DetailModal
          place={selected}
          isSaved={saved.includes(selected.id)}
          onSave={() => toggleSaved(selected.id)}
          onClose={() => setSelected(null)}
        />
      )}
      {authOpen && <AuthModal onClose={() => setAuthOpen(false)} onLogin={handleLogin} />}
    </div>
  );
}

interface ListingCardProps {
  place: Listing;
  isSaved: boolean;
  onSave: () => void;
  onSelect: () => void;
}

function ListingCard({ place, isSaved, onSave, onSelect }: ListingCardProps) {
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
          <Heart
            size={17}
            fill={isSaved ? '#cf6a4c' : 'none'}
            color={isSaved ? '#cf6a4c' : 'currentColor'}
          />
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
function Skeleton() {
  return (
    <div>
      <div className="aspect-[1.08] animate-pulse rounded-2xl bg-[#e6ebe4]" />
      <div className="mt-4 h-5 w-2/3 animate-pulse rounded bg-[#e6ebe4]" />
      <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-[#e6ebe4]" />
    </div>
  );
}
interface DetailModalProps {
  place: Listing;
  isSaved: boolean;
  onSave: () => void;
  onClose: () => void;
}

function DetailModal({ place, isSaved, onSave, onClose }: DetailModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#10241d]/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-4xl overflow-auto rounded-3xl bg-white"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="relative aspect-[16/8]">
          <img src={place.image} alt={place.name} className="h-full w-full object-cover" />
          <button
            onClick={onClose}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/90"
            aria-label="Close details"
          >
            <X size={18} />
          </button>
        </div>
        <div className="grid gap-8 p-6 md:grid-cols-[1fr_240px] md:p-9">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#cf6a4c]">{place.tag}</p>
            <h2 className="display mt-2 text-4xl text-[#193f32]">{place.name}</h2>
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
            <button className="mt-5 w-full rounded-xl bg-[#cf6a4c] py-3 font-bold text-white hover:bg-[#b9563a]">
              Reserve stay
            </button>
            <button
              onClick={onSave}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#dfe5dc] py-3 text-sm font-bold text-[#193f32]"
            >
              <Heart size={16} fill={isSaved ? '#cf6a4c' : 'none'} />
              {isSaved ? 'Saved to your list' : 'Save for later'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
interface AuthModalProps {
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<void>;
}

function AuthModal({ onClose, onLogin }: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await onLogin(email, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unable to sign in');
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#10241d]/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={submit}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-white p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5"
          aria-label="Close sign in"
        >
          <X size={18} />
        </button>
        <p className="text-xs font-bold uppercase tracking-wider text-[#cf6a4c]">Welcome back</p>
        <h2 className="display mt-2 text-4xl text-[#193f32]">Sign in to mouv.</h2>
        <p className="mt-2 text-sm text-[#68756d]">
          Use your Firebase account to save favorite stays.
        </p>
        <label className="mt-7 block text-sm font-semibold text-[#193f32]">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#dfe5dc] px-4 py-3 outline-none focus:border-[#cf6a4c]"
          />
        </label>
        <label className="mt-4 block text-sm font-semibold text-[#193f32]">
          Password
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-xl border border-[#dfe5dc] px-4 py-3 outline-none focus:border-[#cf6a4c]"
          />
        </label>
        {error && <p className="mt-3 text-sm text-[#b9563a]">{error}</p>}
        <button className="mt-6 w-full rounded-xl bg-[#193f32] py-3 font-bold text-white">
          Continue
        </button>
      </form>
    </div>
  );
}

export default App;
