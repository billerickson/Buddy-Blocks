import { DEFAULT_SITE_DESCRIPTION, SITE_NAME, SITE_REPOSITORY_URL, absoluteUrl, resolveSiteUrl, siteGraph } from '../../lib/seo';

export function GET({ site }: { site?: URL }) {
  const siteUrl = resolveSiteUrl(site);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      ...siteGraph(siteUrl),
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl.origin}/#software`,
        name: SITE_NAME,
        description: DEFAULT_SITE_DESCRIPTION,
        url: absoluteUrl(siteUrl, '/'),
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web browser',
        author: { '@id': `${siteUrl.origin}/#organization` },
        codeRepository: SITE_REPOSITORY_URL,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return new Response(JSON.stringify(graph), {
    headers: {
      'Content-Type': 'application/ld+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
