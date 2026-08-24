import { Menu, BicepsFlexed } from 'lucide-react';
import { useAuth } from '../../features/auth/auth.hooks';
import { UserMenu } from '../../features/auth/components/UserMenu';
import { Button } from '../ui/Button';

interface HeaderProps {
  onSignInClick: () => void;
}

export function Header({ onSignInClick }: HeaderProps) {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 border-b border-[#dfe5dc] bg-[#f7f8f5]/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 py-5 lg:px-10">
        <a className="flex items-center gap-2 text-[#193f32]" href="#top">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-[#d7e7d4]">
            <BicepsFlexed size={18} />
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
            <UserMenu />
          ) : (
            <Button variant="primary" className="hidden md:block" onClick={onSignInClick}>
              Sign in
            </Button>
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
  );
}
