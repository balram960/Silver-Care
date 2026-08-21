import { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

type Props = {
  open: boolean;
  onClose: () => void;
  message: string;
};

export default function CaregiverAlertModal({ open, onClose, message }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        role="alertdialog"
        aria-live="assertive"
        aria-label="Simulated caregiver alert"
        className="relative w-full max-w-lg rounded-3xl border-4 border-red-700 bg-white p-8 text-center shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close alert"
          className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
        >
          <X className="h-6 w-6" strokeWidth={3} />
        </button>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle className="h-11 w-11 animate-bounce" strokeWidth={2.5} />
        </div>
        <p className="mt-6 text-3xl font-bold text-red-700 sm:text-4xl">
          {message}
        </p>
        <p className="mt-3 text-xl text-stone-500">
          This is a simulated alert for demonstration purposes.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-8 rounded-2xl border-4 border-red-700 bg-red-600 px-8 py-4 text-2xl font-bold text-white transition hover:bg-red-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300"
        >
          Acknowledge
        </button>
      </div>
    </div>
  );
}
