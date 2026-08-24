import { CalendarDays, Search, UserRound } from 'lucide-react';

interface ListingSearchProps {
  query: string;
  onQueryChange: (value: string) => void;
}

export function ListingSearch({ query, onQueryChange }: ListingSearchProps) {
  return (
    <section className="relative z-10 -mb-1 flex flex-col gap-3 rounded-[20px] bg-white p-3 shadow-[0_18px_50px_rgba(35,58,42,.1)] md:flex-row md:items-center md:p-2">
      <label className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 hover:bg-[#f5f7f3]">
        <Search size={19} className="text-[#cf6a4c]" />
        <span className="w-full">
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#193f32]">Where</span>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            className="w-full bg-transparent text-sm text-[#68756d] outline-none placeholder:text-[#a0aaa2]"
            placeholder="Search a city or stay"
          />
        </span>
      </label>
      <div className="hidden h-9 w-px bg-[#e5eae3] md:block" />
      <button className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-[#f5f7f3]">
        <CalendarDays size={19} className="text-[#cf6a4c]" />
        <span>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#193f32]">When</span>
          <span className="text-sm text-[#a0aaa2]">Add your dates</span>
        </span>
      </button>
      <button className="flex flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-[#f5f7f3]">
        <UserRound size={19} className="text-[#cf6a4c]" />
        <span>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#193f32]">Guests</span>
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
  );
}
