import type { LoaderFunctionArgs } from "@remix-run/node";

const SITE_URL = "https://blurrd.xyz";

export async function loader(_args: LoaderFunctionArgs) {
  const body = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
