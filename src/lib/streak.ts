export function calculateCurrentStreak(activityDates: string[], today: string) {
  const activity = new Set(activityDates);
  let cursor = activity.has(today) ? parseDate(today) : addDays(parseDate(today), -1);
  let streak = 0;

  while (activity.has(formatDate(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

export function formatDate(date: Date) {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, '0'),
    String(date.getUTCDate()).padStart(2, '0'),
  ].join('-');
}

function parseDate(value: string) {
  const [year = '1970', month = '01', day = '01'] = value.split('-');
  return new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
}

function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

