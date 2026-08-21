import type { LogEntry, LogKind } from '@/types';

export function formatLogTime(ts: number): string {
  return new Date(ts).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatLogDay(ts: number): string {
  const now = new Date();
  const d = new Date(ts);
  const sameDay = now.toDateString() === d.toDateString();
  if (sameDay) return 'Today';
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  if (yesterday.toDateString() === d.toDateString()) return 'Yesterday';
  return d.toLocaleDateString([], { month: 'short', day: 'numeric' });
}

let counter = 0;
function nextId() {
  counter += 1;
  return `${Date.now()}-${counter}`;
}

export function makeLog(
  text: string,
  kind: LogKind = 'system',
  ts: number = Date.now(),
): LogEntry {
  return { id: nextId(), ts, text, kind };
}

// Five realistic mock entries spanning the past 48 hours, for demo mode.
export function generateDemoLogs(): LogEntry[] {
  const now = Date.now();
  const h = 60 * 60 * 1000;
  return [
    makeLog("'Take morning medication' checked", 'checklist', now - 46 * h),
    makeLog('Mood updated to Good', 'mood', now - 44 * h),
    makeLog("'Drink water' checked", 'checklist', now - 30 * h),
    makeLog("'15-minute walk' checked", 'checklist', now - 24 * h),
    makeLog('Mood updated to Okay', 'mood', now - 6 * h),
  ];
}
