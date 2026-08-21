import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';

type Props = {
  onCommand: (transcript: string) => void;
};

export default function VoiceCompanion({ onCommand }: Props) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [supported, setSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const Ctor =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Ctor) {
      setSupported(false);
      return;
    }
    const rec = new Ctor();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-US';
    rec.onresult = (event: any) => {
      const text = event.results[0][0].transcript as string;
      setTranscript(text);
      onCommand(text);
    };
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    recognitionRef.current = rec;
  }, [onCommand]);

  const toggle = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (listening) {
      rec.stop();
      setListening(false);
      return;
    }
    setTranscript('');
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  if (!supported) {
    return (
      <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-stone-200">
        <h2 className="text-3xl font-bold text-stone-900">Voice Companion</h2>
        <p className="mt-4 rounded-2xl bg-amber-50 p-5 text-xl text-amber-800 ring-1 ring-amber-200">
          Voice input isn't available in this browser. Please try Chrome, Edge,
          or Safari to use the &ldquo;Tap to Talk&rdquo; feature.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="voice-heading"
      className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-stone-200"
    >
      <h2 id="voice-heading" className="text-3xl font-bold text-stone-900">
        Voice Companion
      </h2>
      <button
        type="button"
        onClick={toggle}
        aria-pressed={listening}
        className={[
          'mx-auto mt-6 flex flex-col items-center justify-center gap-3 rounded-3xl border-4 px-8 py-10 transition-all',
          'focus:outline-none focus-visible:ring-4 focus-visible:ring-stone-400 active:scale-[0.98]',
          listening
            ? 'border-rose-500 bg-rose-50 text-rose-900 ring-4 ring-rose-200'
            : 'border-rose-300 bg-rose-50 text-rose-900 hover:brightness-95',
        ].join(' ')}
      >
        <span
          className={[
            'flex h-20 w-20 items-center justify-center rounded-full',
            listening ? 'bg-rose-500 text-white animate-pulse' : 'bg-rose-100 text-rose-600',
          ].join(' ')}
        >
          {listening ? (
            <MicOff className="h-10 w-10" strokeWidth={2.5} />
          ) : (
            <Mic className="h-10 w-10" strokeWidth={2.5} />
          )}
        </span>
        <span className="text-3xl font-bold">
          {listening ? 'Listening...' : '🎙️ Tap to Talk to SilverCare'}
        </span>
      </button>
      {transcript && (
        <p className="mt-5 text-2xl font-medium text-stone-600">
          You said: &ldquo;{transcript}&rdquo;
        </p>
      )}
    </section>
  );
}
