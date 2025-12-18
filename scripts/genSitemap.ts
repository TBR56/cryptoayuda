import fs from 'fs';
import { EXCHANGES_LIST, PAISES, COINS, TOPICS, SCAM_TOPICS, GUIAS_TITLES, PROBLEMAS } from './lib/data';

function slugify(text: string) {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

const BASE_URL = 'https://cryptoayuda.org';

function generateSitemap() {
    const urls: string[] = ['/'];

    // Hubs
    const hubs = ['reviews', 'comparar', 'noticias', 'guias', 'estafas', 'seguridad', 'wallets', 'comparativas', 'faq', 'contacto', 'sobre-nosotros', 'privacidad', 'terminos', 'disclaimer'];
    hubs.forEach(h => urls.push(`/${h}`));

    // Reviews (50)
    EXCHANGES_LIST.slice(0, 50).forEach(ex => urls.push(`/reviews/${slugify(ex)}`));

    // Opiniones (150)
    EXCHANGES_LIST.slice(0, 25).forEach(ex => {
        PAISES.slice(0, 6).forEach(p => urls.push(`/opiniones/${slugify(ex)}/${slugify(p)}`));
    });

    // Problemas (300)
    EXCHANGES_LIST.slice(0, 30).forEach(ex => {
        PROBLEMAS.slice(0, 10).forEach(prob => urls.push(`/problemas/${slugify(ex)}/${prob.slug}`));
    });

    // Guias (300)
    COINS.slice(0, 30).forEach(coin => {
        GUIAS_TITLES.slice(0, 10).forEach(g => urls.push(`/guias/${slugify(g)}/${slugify(coin.name)}`));
    });

    // Guias Localizadas (150)
    COINS.slice(0, 5).forEach(coin => {
        GUIAS_TITLES.slice(0, 5).forEach(g => {
            PAISES.slice(0, 6).forEach(p => urls.push(`/guias/${slugify(g)}/${slugify(coin.name)}/${slugify(p)}`));
        });
    });

    // Estafas (100)
    SCAM_TOPICS.forEach(t => urls.push(`/estafas/${slugify(t)}`));

    // News (100)
    COINS.slice(0, 10).forEach(coin => {
        TOPICS.slice(0, 10).forEach(t => urls.push(`/noticias/${slugify(coin.name)}/${slugify(t)}`));
    });

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : url.split('/').length > 2 ? '0.6' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;

    fs.writeFileSync('./public/sitemap.xml', sitemap);
    console.log(`Sitemap generated with ${urls.length} URLs`);

    const robots = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml`;
    fs.writeFileSync('./public/robots.txt', robots);
}

generateSitemap();
