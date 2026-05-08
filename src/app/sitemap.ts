import { MetadataRoute } from 'next';
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aletheia.org';
  const locales = ['en', 'ar', 'fr', 'de'];
  const routes = ['', '/about', '/history', '/archive', '/culture', '/monitor', '/join'];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/monitor' || route === '/archive' ? 'daily' : 'weekly',
        priority: route === '' ? 1 : 0.8,
      });
    }
  }
 
  return sitemapEntries;
}
