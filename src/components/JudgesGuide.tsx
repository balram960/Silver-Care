import { BookOpen } from 'lucide-react';

const COMMANDS: { phrase: string; action: string }[] = [
  { phrase: '"took medicine" or "check medicine"', action: 'Checks morning medication' },
  { phrase: '"drank water" or "check water"', action: 'Checks the drink water item' },
  { phrase: '"help" or "emergency"', action: 'Triggers the emergency alert' },
];

export default function JudgesGuide() {
  return (
    <section
      aria-labelledby="guide-heading"
      className="rounded-3xl border-2 border-amber-200 bg-amber-50 p-8 shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <BookOpen className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h2 id="guide-heading" className="text-3xl font-bold text-amber-900">
          Judge's Guide
        </h2>
      </div>
      <p className="mt-4 text-xl text-amber-800">
        Tap the microphone, then say any of these commands to control SilverCare
        hands-free:
      </p>
      <ul className="mt-4 space-y-3">
        {COMMANDS.map((c) => (
          <li
            key={c.phrase}
            className="flex flex-col gap-1 rounded-2xl bg-white/70 px-5 py-4 sm:flex-row sm:items-center sm:gap-4"
          >
            <span className="text-2xl font-bold text-amber-900">{c.phrase}</span>
            <span className="hidden text-amber-400 sm:inline">&rarr;</span>
            <span className="text-xl text-amber-700">{c.action}</span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-lg text-amber-700">
        Tip: Turn on &ldquo;Demo Data&rdquo; at the top to see 48 hours of sample
        activity in the log below.
      </p>
    </section>
  );
}
