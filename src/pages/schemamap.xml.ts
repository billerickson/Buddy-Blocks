import { absoluteUrl, resolveSiteUrl } from '../lib/seo';

export function GET({ site }: { site?: URL }) {
  const siteUrl = resolveSiteUrl(site);
  const endpoints = ['/schema/site.json', '/schema/courses.json'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<schemamap xmlns="https://buddyblocks.yoursite.com/schemas/schemamap/1.0">
${endpoints.map((endpoint) => `  <schema><loc>${absoluteUrl(siteUrl, endpoint)}</loc></schema>`).join('\n')}
</schemamap>
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
