import { MetadataRoute } from 'next';
import { createServerSideClient } from '@/lib/supabase-server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ATENÇÃO: Coloque aqui o seu domínio oficial novo
  const baseUrl = 'https://www.egbelajo-odeigbo.com.br';

  // Páginas estáticas principais
  const routes = [
    '',
    '/historia',
    '/doutrina',
    '/login',
    '/esqueci-senha',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Busca artigos do banco para gerar URLs dinâmicas
  const supabase = await createServerSideClient();
  const { data: artigos } = await supabase
    .from('artigos')
    .select('slug, updated_at');

  const artigosRoutes = (artigos || []).map((artigo) => ({
    url: `${baseUrl}/doutrina/${artigo.slug}`,
    lastModified: artigo.updated_at || new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...routes, ...artigosRoutes];
}