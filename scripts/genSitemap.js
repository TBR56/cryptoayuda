const fs = require('fs');

// HARDCODED DATA FOR SITEMAP (MATCHES lib/data.ts)
const EXCHANGES_LIST = ["Binance", "Bybit", "OKX", "KuCoin", "Gate.io", "Kraken", "Coinbase", "Bitget", "Mexc", "Bitso", "Lemon Cash", "Buenbit", "Belo", "Ripio", "SatoshiTango", "TruBit", "Bitvavo", "Fondeadora", "Ledger", "Trezor", "MetaMask", "Phantom", "Trust Wallet", "BitBox", "Tangem", "AirGap", "SafePal", "Exodus", "Atomic Wallet", "Keplr"];
const PAISES = ["España", "México", "Argentina", "Colombia", "Chile", "Perú", "Venezuela", "Uruguay", "Ecuador", "El Salvador"];
const COINS = ["Bitcoin", "Ethereum", "Solana", "Cardano", "XRP", "Polkadot", "Avalanche", "Chainlink", "Polygon", "Litecoin", "Shiba Inu", "Dogecoin", "Arbitrum", "Optimism", "Celestia"];
const GUIAS_TITLES = ["Cómo Comprar", "Guía Avanzada de", "Seguridad para", "Mejor Wallet para", "Cómo Retirar", "Staking de", "Préstamos con", "Evitar Estafas", "Análisis Técnico de", "Futuro de"];
const SCAM_TOPICS = ["Esquemas Ponzi", "Phishing en Exchanges", "Falsos Soportes", "Sitios Web Clonados", "Inversiones Garantizadas", "AirDrops Falsos", "Recuperación de Fondos"];
const TOPICS = ["Bull Market", "Regulación", "ETFs", "Halving", "Adopción Institucional"];
const PROBLEMAS = ["deposito-no-llega", "cuenta-bloqueada", "error-red", "retiro-pendiente", "kyc-fallido"];

function slugify(text) {
    return text.toString().toLowerCase().trim()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Handle accents
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

const BASE_URL = 'https://cryptoayuda.org';

function generateSitemap() {
    const urls = ['/'];

    // Hubs
    const hubs = ['reviews', 'comparar', 'noticias', 'guias', 'estafas', 'seguridad', 'wallets', 'comparativas', 'faq', 'contacto', 'sobre-nosotros', 'privacidad', 'terminos', 'disclaimer'];
    hubs.forEach(h => urls.push(`/${h}`));

    // Reviews (50)
    EXCHANGES_LIST.slice(0, 50).forEach(ex => urls.push(`/reviews/${slugify(ex)}`));

    // Opiniones (200)
    EXCHANGES_LIST.slice(0, 40).forEach(ex => {
        PAISES.slice(0, 10).forEach(p => urls.push(`/opiniones/${slugify(ex)}/${slugify(p)}`));
    });

    // Problemas (250)
    EXCHANGES_LIST.slice(0, 50).forEach(ex => {
        PROBLEMAS.forEach(prob => urls.push(`/problemas/${slugify(ex)}/${prob}`));
    });

    // Guias (300)
    COINS.slice(0, 30).forEach(coin => {
        GUIAS_TITLES.slice(0, 10).forEach(g => urls.push(`/guias/${slugify(g)}/${slugify(coin)}`));
    });

    // Guias Localizadas (300)
    COINS.slice(0, 10).forEach(coin => {
        GUIAS_TITLES.slice(0, 6).forEach(g => {
            PAISES.slice(0, 10).forEach(p => urls.push(`/guias/${slugify(g)}/${slugify(coin)}/${slugify(p)}`));
        });
    });

    // Estafas (100)
    SCAM_TOPICS.forEach(t => {
        urls.push(`/estafas/${slugify(t)}`);
        PAISES.slice(0, 5).forEach(p => urls.push(`/estafas/${slugify(t)}/${slugify(p)}`));
    });

    // News (100)
    COINS.slice(0, 15).forEach(coin => {
        TOPICS.forEach(t => urls.push(`/noticias/${slugify(coin)}/${slugify(t)}`));
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
