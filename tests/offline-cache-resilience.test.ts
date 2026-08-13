import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => ({
  fetchApi: vi.fn(),
  getApiResponse: vi.fn(),
  putApiResponse: vi.fn(),
  listPendingCompletions: vi.fn(),
}));

vi.mock('../src/components/islands/api', () => ({
  fetchApi: mocks.fetchApi,
}));

vi.mock('../src/components/islands/offline/store', () => ({
  addSyncEvent: vi.fn(),
  countPendingCompletions: vi.fn(),
  getApiResponse: mocks.getApiResponse,
  getLessonPack: vi.fn(),
  getPendingCompletion: vi.fn(),
  getSavedTrackPack: vi.fn(),
  listPendingCompletions: mocks.listPendingCompletions,
  putApiResponse: mocks.putApiResponse,
  putLessonPack: vi.fn(),
  queuePendingCompletion: vi.fn(),
  updatePendingCompletion: vi.fn(),
}));

import { fetchCachedApi } from '../src/components/islands/offline/api';

describe('cached API resilience', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.listPendingCompletions.mockResolvedValue([]);
  });

  it('returns network data without waiting for an IndexedDB cache write', async () => {
    const data = { children: [{ id: 'child_1' }] };
    mocks.fetchApi.mockResolvedValue(data);
    mocks.putApiResponse.mockReturnValue(new Promise(() => {}));

    await expect(fetchCachedApi('/api/children', { type: 'children' })).resolves.toEqual({
      data,
      source: 'network',
    });
  });

  it('returns network data when an IndexedDB cache write rejects', async () => {
    const data = { children: [{ id: 'child_1' }] };
    mocks.fetchApi.mockResolvedValue(data);
    mocks.putApiResponse.mockRejectedValue(new Error('IndexedDB unavailable'));

    await expect(fetchCachedApi('/api/children', { type: 'children' })).resolves.toEqual({
      data,
      source: 'network',
    });
  });

  it('uses cached data when the network request fails', async () => {
    mocks.fetchApi.mockRejectedValue(new Error('Network unavailable'));
    mocks.getApiResponse.mockResolvedValue({
      path: '/api/children',
      data: { children: [{ id: 'cached_child' }] },
      savedAt: '2026-08-13T12:00:00.000Z',
    });

    await expect(fetchCachedApi('/api/children', { type: 'children' })).resolves.toEqual({
      data: { children: [{ id: 'cached_child' }] },
      source: 'cache',
      savedAt: '2026-08-13T12:00:00.000Z',
    });
  });

  it('preserves the network error when IndexedDB cache reads also fail', async () => {
    const networkError = new Error('Network unavailable');
    mocks.fetchApi.mockRejectedValue(networkError);
    mocks.getApiResponse.mockRejectedValue(new Error('IndexedDB unavailable'));

    await expect(fetchCachedApi('/api/children', { type: 'children' })).rejects.toBe(networkError);
  });
});
