import { useCallback, useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import Clock from '@/components/Clock';
import MoodCheckIn from '@/components/MoodCheckIn';
import HealthChecklist from '@/components/HealthChecklist';
import EmergencyButton from '@/components/EmergencyButton';
import CaregiverAlertModal from '@/components/CaregiverAlertModal';
import CaregiverActivityLog from '@/components/CaregiverActivityLog';
import VoiceCompanion from '@/components/VoiceCompanion';
import DemoToggle from '@/components/DemoToggle';
import JudgesGuide from '@/components/JudgesGuide';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { generateDemoLogs, makeLog } from '@/utils/log';
import {
  DEFAULT_CHECKLIST,
  MOODS,
  type ChecklistItem,
  type LogEntry,
  type Mood,
} from '@/types';

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

const GREETING = "Welcome back to SilverCare. Let's look after your health today.";

export default function App() {
  const { value: moodEntry, setValue: setMoodEntry } = useLocalStorage<
    { date: string; mood: Mood } | null
  >('silvercare-mood', null);
  const { value: checklist, setValue: setChecklist } = useLocalStorage<ChecklistItem[]>(
    'silvercare-checklist',
    DEFAULT_CHECKLIST,
  );
  const { value: demoEnabled, setValue: setDemoEnabled } = useLocalStorage<boolean>(
    'silvercare-demo',
    false,
  );

  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const spokenRef = useRef(false);

  const today = todayKey();

  const normalizedChecklist: ChecklistItem[] =
    checklist.length === DEFAULT_CHECKLIST.length ? checklist : DEFAULT_CHECKLIST;

  const appendLog = useCallback((entry: LogEntry) => {
    setLogs((prev) => [...prev, entry]);
  }, []);

  // Spoken greeting on first load — guarded against StrictMode double-invoke.
  useEffect(() => {
    if (spokenRef.current) return;
    spokenRef.current = true;
    try {
      if ('speechSynthesis' in window) {
        const utter = new SpeechSynthesisUtterance(GREETING);
        utter.rate = 0.9;
        utter.pitch = 1;
        window.speechSynthesis.speak(utter);
      }
    } catch {
      /* speech not available */
    }
  }, []);

  const triggerEmergency = useCallback(() => {
    setModalOpen(true);
    appendLog(makeLog('EMERGENCY ALERT INITIATED', 'emergency'));
  }, [appendLog]);

  const handlePickMood = useCallback(
    (mood: Mood) => {
      setMoodEntry({ date: today, mood });
      const label = MOODS.find((m) => m.value === mood)?.label ?? mood;
      appendLog(makeLog(`Mood updated to ${label}`, 'mood'));
      if (mood === 'low') {
        setModalOpen(true);
        appendLog(makeLog('Low mood alert sent to caregiver', 'emergency'));
      }
    },
    [setMoodEntry, today, appendLog],
  );

  const handleToggle = useCallback(
    (id: string) => {
      const base =
        checklist.length === DEFAULT_CHECKLIST.length ? checklist : DEFAULT_CHECKLIST;
      const item = base.find((i) => i.id === id);
      const willCheck = item ? !item.done : true;
      setChecklist(
        base.map((i) => (i.id === id ? { ...i, done: !i.done } : i)),
      );
      if (item) {
        appendLog(
          makeLog(
            `'${item.label}' ${willCheck ? 'checked' : 'unchecked'}`,
            'checklist',
          ),
        );
      }
    },
    [checklist, setChecklist, appendLog],
  );

  const handleVoiceCommand = useCallback(
    (raw: string) => {
      const text = raw.toLowerCase().trim();
      const speak = (msg: string) => {
        try {
          if ('speechSynthesis' in window) {
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(msg));
          }
        } catch {
          /* ignore */
        }
      };

      if (text.includes('medicine') || text.includes('medication')) {
        const item = checklist.find((i) => i.id === 'morning-meds');
        if (item && !item.done) {
          handleToggle('morning-meds');
          speak("Got it. I've checked your morning medication.");
          return;
        }
      }
      if (text.includes('water')) {
        const item = checklist.find((i) => i.id === 'drink-water');
        if (item && !item.done) {
          handleToggle('drink-water');
          speak("Great. I've checked drink water for you.");
          return;
        }
      }
      if (text.includes('help') || text.includes('emergency')) {
        triggerEmergency();
        speak('Emergency alert has been sent to your caregiver.');
        return;
      }
      speak("Sorry, I didn't catch that. Try saying help, medicine, or water.");
    },
    [checklist, handleToggle, triggerEmergency],
  );

  const toggleDemo = useCallback(() => {
    setDemoEnabled((prev) => {
      const next = !prev;
      if (next) {
        setLogs(generateDemoLogs());
      } else {
        setLogs([]);
      }
      return next;
    });
  }, [setDemoEnabled]);

  const todayMood = moodEntry?.date === today ? moodEntry.mood : null;

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <header className="sticky top-0 z-30 border-b-2 border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-6 py-5">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 flex-none items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
              <Heart className="h-9 w-9" strokeWidth={2.5} />
            </span>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-stone-900">
                SilverCare
              </h1>
              <p className="text-xl text-stone-500">Your daily wellness dashboard</p>
            </div>
          </div>
          <DemoToggle enabled={demoEnabled} onToggle={toggleDemo} />
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-6 px-6 py-8">
        <Clock />
        <MoodCheckIn mood={todayMood} onPick={handlePickMood} />
        <HealthChecklist items={normalizedChecklist} onToggle={handleToggle} />
        <EmergencyButton onTrigger={triggerEmergency} />
        <VoiceCompanion onCommand={handleVoiceCommand} />
        <JudgesGuide />
        <CaregiverActivityLog
          entries={logs}
          onClear={() => setLogs([])}
        />
      </main>

      <footer className="mx-auto max-w-4xl px-6 pb-10 pt-4 text-center text-xl text-stone-400">
        SilverCare &mdash; caring for you, every day.
      </footer>

      <CaregiverAlertModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        message="🚨 SIMULATED ALERT SENT TO CAREGIVER!"
      />
    </div>
  );
}
