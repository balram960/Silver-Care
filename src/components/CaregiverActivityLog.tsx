import { ListChecks } from 'lucide-react';
import type { LogEntry } from '@/types';
import { formatLogDay, formatLogTime } from '@/utils/log';

type Props = {
  entries: LogEntry[];
  onClear: () => void;
};

const KIND_STYLE: Record<LogEntry['kind'], string> = {
  checklist: 'text-emerald-700',
  mood: 'text-amber-700',
  emergency: 'text-red-700 font-bold',
  system: 'text-stone-600',
};

const KIND_ICON: Record<LogEntry['kind'], string> = {
  checklist: '✓',
  mood: '🙂',
  emergency: '🚨',
  system: '•',
};

export default function CaregiverActivityLog({ entries, onClear }: Props) {
  const ordered = [...entries].sort((a, b) => b.ts - a.ts);

  return (
    <section
      aria-labelledby="log-heading"
      className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-600">
            <ListChecks className="h-7 w-7" strokeWidth={2.5} />
          </span>
          <h2 id="log-heading" className="text-3xl font-bold text-stone-900">
            Caregiver Activity Log
          </h2>
        </div>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="rounded-xl border-2 border-stone-300 bg-stone-50 px-4 py-2 text-lg font-semibold text-stone-600 transition hover:bg-stone-100"
          >
            Clear log
          </button>
        )}
      </div>

      {ordered.length === 0 ? (
        <p className="mt-6 rounded-2xl bg-stone-50 p-6 text-xl text-stone-400">
          No activity yet. Your check-ins, mood updates, and alerts will appear here.
        </p>
      ) : (
        <ol className="mt-6 space-y-3">
          {ordered.map((e) => (
            <li
              key={e.id}
              className="flex items-start gap-4 rounded-2xl border-2 border-stone-100 bg-stone-50 px-5 py-4"
            >
              <span className="text-2xl" aria-hidden="true">
                {KIND_ICON[e.kind]}
              </span>
              <div className="min-w-0 flex-1">
                <p className={`text-2xl ${KIND_STYLE[e.kind]}`}>{e.text}</p>
                <p className="mt-1 text-lg text-stone-400">
                  {formatLogDay(e.ts)} at {formatLogTime(e.ts)}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
