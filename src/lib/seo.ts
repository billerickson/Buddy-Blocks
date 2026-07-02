import type { CourseFamily } from './public-courses';

export type BreadcrumbEntry = {
  name: string;
  path: string;
};

export type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

export const SITE_NAME = 'Buddy Blocks';
export const SITE_AUTHOR = 'Bill, Reagan, and Ada Erickson';
export const SITE_REPOSITORY_URL = 'https://github.com/billerickson/Buddy-Blocks';
export const DEFAULT_SITE_URL = 'https://buddyblocks.yoursite.com';
export const DEFAULT_OG_IMAGE = '/og/buddy-blocks-option-2.png';
export const DEFAULT_OG_IMAGE_ALT = 'Buddy Blocks social preview showing a kid dashboard and small lesson momentum';
export const DEFAULT_SITE_DESCRIPTION =
  'Buddy Blocks is a self-hosted family learning app with short lessons, parent dashboards, progress rewards, and classical course paths for kids.';

export function resolveSiteUrl(site?: URL | string | null) {
  const url = new URL(site?.toString() || DEFAULT_SITE_URL);
  url.pathname = url.pathname.replace(/\/?$/, '/');
  return url;
}

export function absoluteUrl(site: URL | string | null | undefined, path = '/') {
  return new URL(path, resolveSiteUrl(site)).toString();
}

export function canonicalPath(pathname: string) {
  const [pathWithoutQuery] = pathname.split(/[?#]/);
  const normalized = pathWithoutQuery.startsWith('/') ? pathWithoutQuery : `/${pathWithoutQuery}`;
  if (normalized === '/') return '/';
  if (normalized.includes('.') || normalized.endsWith('/')) return normalized;
  return `${normalized}/`;
}

export function isIndexableMarketingPath(pathname: string) {
  const path = canonicalPath(pathname);
  return path === '/' || path === '/courses/' || /^\/courses\/[^/]+\/$/.test(path);
}

export function siteGraph(site: URL | string | null | undefined) {
  const siteUrl = resolveSiteUrl(site);
  const origin = siteUrl.origin;

  return [
    {
      '@type': 'Organization',
      '@id': `${origin}/#organization`,
      name: SITE_NAME,
      url: `${origin}/`,
      logo: {
        '@type': 'ImageObject',
        '@id': `${origin}/#logo`,
        url: absoluteUrl(siteUrl, '/icons/buddy-blocks-bb-large.svg'),
        width: 64,
        height: 64,
      },
      sameAs: [SITE_REPOSITORY_URL],
    },
    {
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      name: SITE_NAME,
      url: `${origin}/`,
      description: DEFAULT_SITE_DESCRIPTION,
      publisher: { '@id': `${origin}/#organization` },
      inLanguage: 'en-US',
      copyrightHolder: { '@id': `${origin}/#organization` },
    },
  ];
}

export function breadcrumbGraph(site: URL | string | null | undefined, breadcrumbs: BreadcrumbEntry[]) {
  if (breadcrumbs.length === 0) return null;

  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(site, breadcrumbs[breadcrumbs.length - 1].path)}#breadcrumbs`,
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(site, item.path),
    })),
  };
}

export function webPageGraph({
  site,
  canonicalUrl,
  title,
  description,
  breadcrumbs = [],
  pageType = 'WebPage',
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  extra = [],
}: {
  site?: URL | string | null;
  canonicalUrl: string;
  title: string;
  description: string;
  breadcrumbs?: BreadcrumbEntry[];
  pageType?: string;
  image?: string;
  imageAlt?: string;
  extra?: Array<Record<string, unknown>>;
}) {
  const siteUrl = resolveSiteUrl(site);
  const origin = siteUrl.origin;
  const breadcrumb = breadcrumbGraph(siteUrl, breadcrumbs);
  const imageUrl = absoluteUrl(siteUrl, image);
  const graph = [
    ...siteGraph(siteUrl),
    {
      '@type': 'ImageObject',
      '@id': `${canonicalUrl}#primaryimage`,
      url: imageUrl,
      width: 1200,
      height: 675,
      caption: imageAlt,
    },
    {
      '@type': pageType,
      '@id': `${canonicalUrl}#webpage`,
      url: canonicalUrl,
      name: title,
      description,
      isPartOf: { '@id': `${origin}/#website` },
      primaryImageOfPage: { '@id': `${canonicalUrl}#primaryimage` },
      breadcrumb: breadcrumb ? { '@id': breadcrumb['@id'] } : undefined,
      inLanguage: 'en-US',
    },
    ...(breadcrumb ? [breadcrumb] : []),
    ...extra,
  ];

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}

export function courseFamilyGraph(site: URL | string | null | undefined, family: CourseFamily) {
  const siteUrl = resolveSiteUrl(site);
  const canonical = absoluteUrl(siteUrl, `/courses/${family.slug}/`);

  return {
    '@type': 'Course',
    '@id': `${canonical}#course`,
    name: `${family.title} Learning Courses`,
    description: family.summary,
    url: canonical,
    provider: { '@id': `${siteUrl.origin}/#organization` },
    educationalLevel: family.levelRange,
    teaches: family.tracks.map((track) => track.title),
    hasPart: family.tracks.map((track) => ({
      '@type': 'Course',
      '@id': `${canonical}#${track.slug}`,
      name: track.title,
      description: track.description,
      educationalLevel: track.label,
      numberOfCredits: track.stats.lessons,
    })),
  };
}
