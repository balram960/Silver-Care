import { Check } from 'lucide-react';
import type { ChecklistItem } from '@/types';

type Props = {
  items: ChecklistItem[];
  onToggle: (id: string) => void;
};

export default function HealthChecklist({ items, onToggle }: Props) {
  const doneCount = items.filter((i) => i.done).length;

  return (
    <section
      aria-labelledby="checklist-heading"
      className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="checklist-heading"
          className="text-3xl font-bold text-stone-900"
        >
          Daily Health Checklist
        </h2>
        <p className="text-2xl font-semibold text-stone-500">
          {doneCount} of {items.length} done
        </p>
      </div>

      <ul className="mt-6 space-y-4">
        {items.map((item) => {
          const selected = item.done;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onToggle(item.id)}
                aria-pressed={selected}
                className={[
                  'flex w-full items-center gap-5 rounded-2xl border-4 px-6 py-6 text-left transition-all',
                  'focus:outline-none focus-visible:ring-4 focus-visible:ring-stone-400',
                  'hover:brightness-95 active:scale-[0.99]',
                  selected
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-stone-200 bg-stone-50',
                ].join(' ')}
              >
                <span
                  className={[
                    'flex h-12 w-12 flex-none items-center justify-center rounded-xl border-4 transition-colors',
                    selected
                      ? 'border-emerald-600 bg-emerald-600 text-white'
                      : 'border-stone-300 bg-white text-transparent',
                  ].join(' ')}
                  aria-hidden="true"
                >
                  <Check className="h-7 w-7" strokeWidth={3} />
                </span>
                <span
                  className={[
                    'text-3xl font-semibold',
                    selected ? 'text-emerald-900 line-through' : 'text-stone-800',
                  ].join(' ')}
                >
                  {item.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
