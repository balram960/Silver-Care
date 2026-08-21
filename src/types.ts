export type Mood = 'good' | 'okay' | 'low';

export type MoodEntry = {
  date: string; // YYYY-MM-DD
  mood: Mood;
};

export type ChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};

export type LogKind = 'checklist' | 'mood' | 'emergency' | 'system';

export type LogEntry = {
  id: string;
  ts: number;
  text: string;
  kind: LogKind;
};

export const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: 'morning-meds', label: 'Take morning medication', done: false },
  { id: 'drink-water', label: 'Drink water', done: false },
  { id: 'walk', label: '15-minute walk', done: false },
  { id: 'evening-meds', label: 'Take evening medication', done: false },
];

export const MOODS: { value: Mood; label: string; emoji: string }[] = [
  { value: 'good', label: 'Good', emoji: '😊' },
  { value: 'okay', label: 'Okay', emoji: '😐' },
  { value: 'low', label: 'Low', emoji: '😟' },
];
