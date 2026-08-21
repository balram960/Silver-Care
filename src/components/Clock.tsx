import { useEffect, useState } from 'react';

function todayKey(d = new Date()) {
  return d.toISOString().slice(0, 10); // YYYY-MM-DD
}

export default function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  });
  const weekday = now.toLocaleDateString(undefined, { weekday: 'long' });
  const monthDay = now.toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <section
      aria-label="Current date and time"
      className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200"
    >
      <p className="text-xl font-medium text-stone-500">{weekday}</p>
      <time
        dateTime={todayKey(now)}
        className="mt-1 block text-2xl font-semibold text-stone-700"
      >
        {monthDay}
      </time>
      <p className="mt-4 text-7xl font-bold tracking-tight text-stone-900 tabular-nums sm:text-8xl">
        {time}
      </p>
    </section>
  );
}
