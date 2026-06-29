export async function fetchApi<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(path, {
    credentials: 'same-origin',
    headers: init?.body ? { 'Content-Type': 'application/json', ...(init.headers || {}) } : init?.headers,
    ...init,
  });

  if (response.status === 401) {
    window.location.href = '/login/';
    throw new Error('Not authenticated');
  }

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(body.error || `Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function percent(done: number, total: number) {
  if (!total) return 0;
  return Math.round((done / total) * 100);
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}
