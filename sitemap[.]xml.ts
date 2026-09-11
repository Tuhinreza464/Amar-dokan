import { createFileRoute } from "@tanstack/react-router";
import { requestOrigin, sitemapPaths } from "@/lib/seo";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = requestOrigin(request);
        const urls = sitemapPaths()
          .map(
            (path) =>
              `  <url>\n    <loc>${origin}${path}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`,
          )
          .join("\n");
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
