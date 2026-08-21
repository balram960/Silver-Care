import { Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';

type Props = {
  onTrigger?: () => void;
};

export default function EmergencyButton({ onTrigger }: Props) {
  const [confirming, setConfirming] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [calling, setCalling] = useState(false);

  useEffect(() => {
    if (!confirming || calling) return;
    if (countdown <= 0) {
      setCalling(true);
      onTrigger?.();
      return;
    }
    const id = window.setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => window.clearTimeout(id);
  }, [confirming, countdown, calling, onTrigger]);

  const reset = () => {
    setConfirming(false);
    setCalling(false);
    setCountdown(5);
  };

  const callNow = () => {
    setCalling(true);
    onTrigger?.();
  };

  if (calling) {
    return (
      <div className="rounded-3xl bg-red-600 p-8 text-center shadow-lg">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
          <Phone className="h-10 w-10 animate-pulse text-white" strokeWidth={2.5} />
        </div>
        <p className="mt-6 text-4xl font-bold text-white">Calling for help...</p>
        <p className="mt-2 text-2xl text-red-100">
          Stay calm. Assistance is on the way.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 rounded-2xl border-4 border-white/40 bg-white/10 px-8 py-4 text-2xl font-bold text-white transition hover:bg-white/20"
        >
          Cancel call
        </button>
      </div>
    );
  }

  if (confirming) {
    return (
      <div className="rounded-3xl bg-red-600 p-8 text-center shadow-lg">
        <p className="text-4xl font-bold text-white">
          Call emergency services in {countdown}?
        </p>
        <p className="mt-2 text-2xl text-red-100">Tap cancel to stop.</p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={reset}
            className="flex items-center justify-center gap-3 rounded-2xl border-4 border-white/40 bg-white/10 px-8 py-5 text-2xl font-bold text-white transition hover:bg-white/20"
          >
            <X className="h-7 w-7" strokeWidth={3} />
            Cancel
          </button>
          <button
            type="button"
            onClick={callNow}
            className="flex items-center justify-center gap-3 rounded-2xl border-4 border-white bg-white px-8 py-5 text-2xl font-bold text-red-700 transition hover:bg-red-50"
          >
            <Phone className="h-7 w-7" strokeWidth={3} />
            Call now
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="flex w-full items-center justify-center gap-4 rounded-3xl border-4 border-red-800 bg-red-600 px-8 py-10 text-5xl font-bold text-white shadow-lg transition-all hover:bg-red-700 focus:outline-none focus-visible:ring-8 focus-visible:ring-red-300 active:scale-[0.98]"
    >
      <Phone className="h-12 w-12" strokeWidth={2.5} />
      Emergency Help
    </button>
  );
}
