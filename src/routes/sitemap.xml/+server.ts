export async function GET() {
	return new Response(`
      <?xml version="1.0" encoding="UTF-8" ?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://joshberube.com</loc>
          <lastmod>2026-11-05</lastmod>
        </url>
        <url>
          <loc>https://joshberube.com/games/pop-pops</loc>
          <lastmod>2026-11-05</lastmod>
        </url>
      </urlset>
    `.trim(),
		{
			headers: {
				'Content-Type': 'application/xml'
			}
		}
	);
}