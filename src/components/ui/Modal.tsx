import { X } from 'lucide-react';
import type { MouseEvent, ReactNode } from 'react';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  maxWidthClassName?: string;
}

export function Modal({ onClose, children, maxWidthClassName = 'max-w-md' }: ModalProps) {
  const stopPropagation = (event: MouseEvent) => event.stopPropagation();

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#10241d]/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`relative max-h-[90vh] w-full overflow-auto rounded-3xl bg-white p-8 ${maxWidthClassName}`}
        onClick={stopPropagation}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full text-[#193f32] hover:bg-[#f5f7f3]"
          aria-label="Close"
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}
