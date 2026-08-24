import type { ReactNode } from 'react';

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <main id="top" className="mx-auto max-w-[1320px] px-5 pb-20 lg:px-10">
      {children}
    </main>
  );
}
