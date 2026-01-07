import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.egbelajo-odeigbo.com.br';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/api/'], // Protege a área administrativa
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}