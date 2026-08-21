import { MOODS, type Mood } from '@/types';

type Props = {
  mood: Mood | null;
  onPick: (mood: Mood) => void;
};

const MOOD_STYLES: Record<Mood, string> = {
  good: 'border-emerald-400 bg-emerald-50 text-emerald-900',
  okay: 'border-amber-400 bg-amber-50 text-amber-900',
  low: 'border-sky-400 bg-sky-50 text-sky-900',
};

const MOOD_SELECTED: Record<Mood, string> = {
  good: 'border-emerald-600 bg-emerald-200 text-emerald-950 ring-4 ring-emerald-300',
  okay: 'border-amber-600 bg-amber-200 text-amber-950 ring-4 ring-amber-300',
  low: 'border-sky-600 bg-sky-200 text-sky-950 ring-4 ring-sky-300',
};

export default function MoodCheckIn({ mood, onPick }: Props) {
  return (
    <section
      aria-labelledby="mood-heading"
      className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200"
    >
      <h2
        id="mood-heading"
        className="text-3xl font-bold text-stone-900"
      >
        How are you feeling today?
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {MOODS.map((m) => {
          const selected = mood === m.value;
          return (
            <button
              key={m.value}
              type="button"
              onClick={() => onPick(m.value)}
              aria-pressed={selected}
              className={[
                'flex flex-col items-center justify-center gap-2 rounded-2xl border-4 px-6 py-10 text-3xl font-bold transition-all',
                'focus:outline-none focus-visible:ring-4 focus-visible:ring-stone-400',
                'hover:brightness-95 active:scale-[0.98]',
                selected ? MOOD_SELECTED[m.value] : MOOD_STYLES[m.value],
              ].join(' ')}
            >
              <span className="text-6xl" aria-hidden="true">
                {m.emoji}
              </span>
              {m.label}
            </button>
          );
        })}
      </div>
      {mood && (
        <p className="mt-6 text-2xl font-medium text-stone-600">
          Mood saved for today. Thank you for checking in.
        </p>
      )}
    </section>
  );
}
