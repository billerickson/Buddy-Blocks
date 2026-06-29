export function childSlugFromLocation(fallback?: string) {
  if (fallback) return fallback;
  const match = pathname().match(/^\/kid\/([^/]+)(?:\/|$)/);
  return match ? decodeURIComponent(match[1]) : '';
}

export function trackRouteParams(fallbackChildSlug?: string, fallbackTrackSlug?: string) {
  const match = pathname().match(/^\/kid\/([^/]+)\/track\/([^/]+)(?:\/|$)/);
  return {
    childSlug: fallbackChildSlug || (match ? decodeURIComponent(match[1]) : ''),
    trackSlug: fallbackTrackSlug || (match ? decodeURIComponent(match[2]) : ''),
  };
}

export function lessonRouteParams(fallbackChildSlug?: string, fallbackLessonId?: string) {
  const match = pathname().match(/^\/kid\/([^/]+)\/lesson\/([^/]+)(?:\/|$)/);
  return {
    childSlug: fallbackChildSlug || (match ? decodeURIComponent(match[1]) : ''),
    lessonId: fallbackLessonId || (match ? decodeURIComponent(match[2]) : ''),
  };
}

function pathname() {
  return typeof window === 'undefined' ? '' : window.location.pathname;
}
