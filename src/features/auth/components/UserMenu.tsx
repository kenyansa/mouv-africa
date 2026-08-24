import { LogOut, UserRound } from 'lucide-react';
import { useAuth } from '../auth.hooks';

export function UserMenu() {
  const { user, signOut } = useAuth();
  if (!user) return null;

  return (
    <button
      onClick={() => void signOut()}
      className="hidden items-center gap-2 rounded-full border border-[#d4ddd3] px-4 py-2 text-sm font-semibold text-[#193f32] transition hover:border-[#193f32] md:flex"
    >
      <UserRound size={16} />
      {user.email?.split('@')[0] ?? 'Account'}
      <LogOut size={14} className="text-[#68756d]" />
    </button>
  );
}
