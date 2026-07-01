import { absoluteUrl, resolveSiteUrl } from '../lib/seo';

export function GET({ site }: { site?: URL }) {
  const siteUrl = resolveSiteUrl(site);
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /kid/',
    'Disallow: /parent/',
    'Disallow: /profiles/',
    'Disallow: /login/',
    'Disallow: /logout/',
    'Disallow: /setup/',
    'Disallow: /parent-gate/',
    'Disallow: /brand/',
    'Disallow: /brand-options/',
    '',
    `Sitemap: ${absoluteUrl(siteUrl, '/sitemap-index.xml')}`,
    `# Schema map: ${absoluteUrl(siteUrl, '/schemamap.xml')}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
