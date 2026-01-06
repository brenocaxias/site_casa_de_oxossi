import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard/', '/admin/'], // Segurança: Google não deve indexar área logada
    },
    sitemap: 'https://www.egbelajo-odeigbo.com.br/sitemap.xml',
  }
}