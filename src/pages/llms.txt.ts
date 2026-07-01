import { getCourseFamilies } from '../lib/public-courses';
import { DEFAULT_SITE_DESCRIPTION, SITE_NAME, SITE_REPOSITORY_URL, absoluteUrl, resolveSiteUrl } from '../lib/seo';

export function GET({ site }: { site?: URL }) {
  const siteUrl = resolveSiteUrl(site);
  const courseFamilies = getCourseFamilies();
  const courseLinks = courseFamilies
    .map((family) => `- [${family.title}](${absoluteUrl(siteUrl, `/courses/${family.slug}/`)}): ${family.summary}`)
    .join('\n');
  const body = `# ${SITE_NAME}

> ${DEFAULT_SITE_DESCRIPTION}

Buddy Blocks is a self-hosted educational web app for one family. It includes a public course catalog, first-run setup, parent profile management, kid dashboards, lesson practice, saved progress, and Cloudflare Workers/D1 deployment instructions.

## Public Pages

- [Home](${absoluteUrl(siteUrl, '/')})
- [Courses](${absoluteUrl(siteUrl, '/courses/')})

## Course Families

${courseLinks}

## Machine-Readable Discovery

- [Sitemap](${absoluteUrl(siteUrl, '/sitemap-index.xml')})
- [Schema map](${absoluteUrl(siteUrl, '/schemamap.xml')})
- [Site schema](${absoluteUrl(siteUrl, '/schema/site.json')})
- [Course schema](${absoluteUrl(siteUrl, '/schema/courses.json')})

## Source

- [GitHub repository](${SITE_REPOSITORY_URL})
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
