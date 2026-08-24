interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#cfd9cc] py-16 text-center text-[#68756d]">
      <p className="font-semibold text-[#193f32]">{title}</p>
      {description && <p className="mt-1 text-sm">{description}</p>}
    </div>
  );
}
