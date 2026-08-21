type Props = {
  enabled: boolean;
  onToggle: () => void;
};

export default function DemoToggle({ enabled, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      className={[
        'flex items-center gap-3 rounded-2xl border-4 px-5 py-3 text-xl font-bold transition-all',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-stone-400',
        enabled
          ? 'border-emerald-600 bg-emerald-100 text-emerald-900'
          : 'border-stone-300 bg-white text-stone-600 hover:bg-stone-50',
      ].join(' ')}
    >
      <span
        className={[
          'flex h-8 w-14 items-center rounded-full p-1 transition-colors',
          enabled ? 'bg-emerald-500' : 'bg-stone-300',
        ].join(' ')}
        aria-hidden="true"
      >
        <span
          className={[
            'h-6 w-6 rounded-full bg-white shadow transition-transform',
            enabled ? 'translate-x-6' : 'translate-x-0',
          ].join(' ')}
        />
      </span>
      Demo Data
    </button>
  );
}
