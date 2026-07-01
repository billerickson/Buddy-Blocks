import { getCourseFamilies } from '../../lib/public-courses';
import { SITE_NAME, absoluteUrl, courseFamilyGraph, resolveSiteUrl, siteGraph } from '../../lib/seo';

export function GET({ site }: { site?: URL }) {
  const siteUrl = resolveSiteUrl(site);
  const families = getCourseFamilies();
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      ...siteGraph(siteUrl),
      {
        '@type': 'CollectionPage',
        '@id': `${absoluteUrl(siteUrl, '/courses/')}#webpage`,
        name: `${SITE_NAME} Courses`,
        url: absoluteUrl(siteUrl, '/courses/'),
        isPartOf: { '@id': `${siteUrl.origin}/#website` },
        hasPart: families.map((family) => ({ '@id': `${absoluteUrl(siteUrl, `/courses/${family.slug}/`)}#course` })),
      },
      ...families.map((family) => courseFamilyGraph(siteUrl, family)),
    ],
  };

  return new Response(JSON.stringify(graph), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
