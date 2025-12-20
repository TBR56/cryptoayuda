const fs = require('fs');

// DATA SOURCES (MATCHES lib/data.ts)
const EXCHANGES_LIST = [
    "Binance", "Coinbase", "Kraken", "KuCoin", "Bybit", "OKX", "Bitget", "Gate.io", "BingX", "MEXC",
    "HTX", "Bitfinex", "Bitstamp", "Gemini", "Crypto.com", "Phemex", "Poloniex", "LBank", "XT.com", "CoinEx",
    "BitMart", "AscendEX", "DigiFinex", "Deepcoin", "Zoomex", "Woo X", "Bitrue", "WhiteBIT", "CoinW", "Tapbit",
    "Upbit", "Bithumb", "Coinone", "Korbit", "Gopax", "bitFlyer", "Coincheck", "GMO Coin", "Indodax", "Tokocrypto",
    "Pintu", "Bitkub", "Satang Pro", "Coins.ph", "PDAX", "Paribu", "BtcTurk", "Bitlo", "MercadoBitcoin", "Foxbit",
    "Novadax", "BitcoinTrade", "Ripio", "Bitso", "Volabit", "Lemon Cash", "Buenbit", "Belo", "SatoshiTango", "ArgenBTC",
    "Decrypto", "TiendaCrypto", "LetsBit", "Buda", "Orionx", "CryptoMarket", "Luno", "VALR", "Swyftx", "CoinSpot",
    "Independent Reserve", "Digital Surrey", "Bitvavo", "Coinmerce", "LiteBit", "Young Platform", "The Rock Trading",
    "Bitpanda", "Coinfinity", "Bisenomic", "ZebPay", "WazirX", "CoinDCX", "Rain", "CoinMENA", "BitOasis",
    "Bluebit", "Dex-Trade", "ProBit", "Azbit", "Latoken", "Finexbox", "FMFW.io", "CEX.io", "EXMO", "HitBTC",
    "YoBit", "Mercatox", "Tidex", "STEX", "Kanga", "LocalCoinsSwap", "Paxful", "Bisq", "HodlHodl"
];

const PAISES = [
    "Argentina", "México", "España", "Colombia", "Chile", "Perú",
    "Uruguay", "Paraguay", "Bolivia", "Ecuador", "Venezuela",
    "Panamá", "Costa Rica", "República Dominicana", "Guatemala",
    "El Salvador", "Honduras", "Nicaragua", "Cuba", "Puerto Rico",
    "Estados Unidos", "Brasil", "Portugal", "Andorra", "Francia", "Italia", "Alemania", "Reino Unido"
];

const COINS = [
    "Bitcoin", "Ethereum", "Solana", "Cardano", "XRP", "Polkadot", "Dogecoin", "Shiba Inu", "Avalanche",
    "Polygon", "Litecoin", "Chainlink", "Stellar", "Binance Coin", "Tron", "Monero", "Cosmos", "Algorand",
    "Near Protocol", "Aptos", "Sui", "Pepe", "Arbitrum", "Optimism", "Render", "Kaspa", "Injective",
    "Celestia", "Filecoin", "Internet Computer", "Worldcoin", "Bittensor", "Stacks", "JasmyCoin", "Bonk",
    "Jupiter", "Ethena", "Fetch.ai", "SingularityNET", "Flow", "Mantra", "Ondo"
];

const GUIAS_TITLES = [
    "Cómo Comprar", "Es Seguro Invertir en", "Predicción de Precio 2025 para",
    "Mejor Wallet para", "Staking de", "Análisis Fundamental de", "Evitar Estafas con",
    "Comprar con PayPal", "Retirar a Cuenta Bancaria desde", "Configurar Metamask para",
    "Minería de", "Futura Regulación de", "Historial de Precios de", "Comparativa Crypto vs Fiat",
    "Errores comunes al enviar", "Cómo recuperar", "Mejor App para tradear", "Impuestos sobre",
    "Comprar sin comisiones", "Intercambio P2P de", "Seguridad Avanzada para", "Préstamos con colateral en",
    "Alternativas a", "Opiniones Reales sobre", "Cómo funciona el protocolo de", "Ventajas y Desventajas de",
    "Guía Definitiva 2025 de", "Es real o farsa", "Comunidad oficial de", "Tutorial paso a paso de"
];

const SCAM_TOPICS = [
    "Esquemas Ponzi", "Phishing con Airdrops", "Estafas de Romance", "Fake Exchanges", "Rug Pulls en DeFi",
    "Malware en Wallets", "Suplantación de Identidad", "Estafas de Minería", "Grupos de Telegram Falsos",
    "Giveaways Falsos", "Hack de Sims Swapping", "Inversores Falsos", "Apps de Trading Falsas", "Webs de Arbitraje Falsas"
];

const TOPICS = [
    "Regulación SEC", "Adopción Institucional", "Halving de Bitcoin", "Upgrade Dencun", "Hackeo en DeFi",
    "Listado en Binance", "Rumores de ETF Spot", "Asociación con Visa", "Lanzamiento de Mainnet",
    "Quema de Tokens", "Airdrop Masivo", "Demanda Legal", "Impuestos Crypto", "Minería Sostenible",
    "Privacidad Monero", "Scalability L2", "NFT Utility", "Stablecoin Regulation", "CBDC Launch",
    "Minería con GPU", "Proof of Work vs Stake", "Inteligencia Artificial y Crypto", "DePIN", "Real World Assets (RWA)",
    "Billeteras Frías", "Libertad Financiera", "Inflación y Cripto", "Web3 Gaming", "Metaverso 2025"
];

const PROBLEMAS = [
    "cuenta-suspendida", "fondos-retenidos", "kyc-rechazado", "retiro-pendiente", "deposito-no-acreditado",
    "phishing", "error-2fa", "api-error", "app-lenta", "login-imposible", "tarjeta-rechazada", "p2p-estafa",
    "comisiones-altas", "cuenta-hackeada", "cambio-email", "limite-excedido", "error-red"
];

function slugify(text) {
    if (!text) return '';
    return text.toString().toLowerCase().trim()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-');
}

// 1. Dynamic Domain (IMPORTANT for Search Console mismatch)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://cryptoayudahoy.vercel.app';
const LASTMOD = new Date().toISOString().split('T')[0];

function generateXml(urls, priority = 0.6) {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${BASE_URL}${url}</loc>
    <lastmod>${LASTMOD}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${url === '/' ? '1.0' : priority}</priority>
  </url>`).join('\n')}
</urlset>`;
}

function writeSitemap(name, urls, priority) {
    const content = generateXml(urls, priority);
    fs.writeFileSync(`./public/${name}`, content);
    console.log(`Generated ${name} with ${urls.length} URLs.`);
}

function generateSitemaps() {
    const sitemaps = [];

    // 1. Static & Hubs
    const staticUrls = [
        '/', '/reviews', '/comparar', '/noticias', '/guias', '/estafas', '/seguridad',
        '/wallets', '/comparativas', '/faq', '/contacto', '/sobre-nosotros',
        '/privacidad', '/terminos', '/disclaimer', '/problemas', '/diagnostico'
    ];
    writeSitemap('sitemap-static.xml', staticUrls, 0.8);
    sitemaps.push('sitemap-static.xml');

    // 2. Reviews
    const reviewUrls = EXCHANGES_LIST.map(ex => `/reviews/${slugify(ex)}`);
    writeSitemap('sitemap-reviews.xml', reviewUrls, 0.7);
    sitemaps.push('sitemap-reviews.xml');

    // 3. Opiniones
    const opinionUrls = [];
    EXCHANGES_LIST.forEach(ex => {
        PAISES.forEach(p => opinionUrls.push(`/opiniones/${slugify(ex)}/${slugify(p)}`));
    });
    writeSitemap('sitemap-opiniones.xml', opinionUrls, 0.5);
    sitemaps.push('sitemap-opiniones.xml');

    // 4. Problemas
    const problemaUrls = [];
    EXCHANGES_LIST.forEach(ex => {
        PROBLEMAS.forEach(prob => problemaUrls.push(`/problemas/${slugify(ex)}/${prob}`));
    });
    writeSitemap('sitemap-problemas.xml', problemaUrls, 0.5);
    sitemaps.push('sitemap-problemas.xml');

    // 5. Guias
    const guiaUrls = [];
    COINS.forEach(coin => {
        GUIAS_TITLES.forEach(g => guiaUrls.push(`/guias/${slugify(g)}/${slugify(coin)}`));
    });
    // Massive Localized expansion - ALL COINS
    COINS.forEach(coin => {
        GUIAS_TITLES.forEach(g => {
            PAISES.forEach(p => guiaUrls.push(`/guias/${slugify(g)}/${slugify(coin)}/${slugify(p)}`));
        });
    });
    writeSitemap('sitemap-guias.xml', guiaUrls, 0.6);
    sitemaps.push('sitemap-guias.xml');

    // 6. Estafas
    const scamUrls = SCAM_TOPICS.map(t => `/estafas/${slugify(t)}`);
    writeSitemap('sitemap-estafas.xml', scamUrls, 0.7);
    sitemaps.push('sitemap-estafas.xml');

    // 7. News
    const newsUrls = [];
    COINS.forEach(coin => {
        TOPICS.forEach(topic => newsUrls.push(`/noticias/${slugify(coin)}/${slugify(topic)}`));
    });
    writeSitemap('sitemap-noticias.xml', newsUrls, 0.6);
    sitemaps.push('sitemap-noticias.xml');

    // 8. Diagnostico
    const diagUrls = [];
    EXCHANGES_LIST.forEach(ex => {
        diagUrls.push(`/diagnostico/${slugify(ex)}`);
        PROBLEMAS.forEach(prob => diagUrls.push(`/diagnostico/${slugify(ex)}/${prob}`));
    });
    writeSitemap('sitemap-diagnostico.xml', diagUrls, 0.6);
    sitemaps.push('sitemap-diagnostico.xml');

    // 9. Comparativas (N x N) - MASSIVE SEO
    const compareUrls = [];
    const mainExchanges = EXCHANGES_LIST.slice(0, 50); // Compare top 50 significantly
    for (let i = 0; i < mainExchanges.length; i++) {
        for (let j = i + 1; j < mainExchanges.length; j++) {
            compareUrls.push(`/comparar/${slugify(mainExchanges[i])}-vs-${slugify(mainExchanges[j])}`);
        }
    }
    writeSitemap('sitemap-comparativas.xml', compareUrls, 0.7);
    sitemaps.push('sitemap-comparativas.xml');

    // 10. Auditorías de Confianza (Trust Audits)
    const auditUrls = [];
    const TRUST_FACTORS = ["licencia", "reservas", "antiguedad", "seguridad-fondos", "soporte", "tarifas"];
    EXCHANGES_LIST.forEach(ex => {
        auditUrls.push(`/auditoria/${slugify(ex)}`);
        TRUST_FACTORS.forEach(factor => auditUrls.push(`/auditoria/${slugify(ex)}/${factor}`));
    });
    writeSitemap('sitemap-auditorias.xml', auditUrls, 0.6);
    sitemaps.push('sitemap-auditorias.xml');

    // 11. Sitemap Index
    const indexContent = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(s => `  <sitemap>
    <loc>${BASE_URL}/${s}</loc>
    <lastmod>${LASTMOD}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;
    fs.writeFileSync('./public/sitemap.xml', indexContent);
    console.log(`Generated sitemap.xml (Index) with ${sitemaps.length} sub-maps.`);

    // 10. Robots.txt
    const robots = `User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`;
    fs.writeFileSync('./public/robots.txt', robots);
    console.log(`Updated robots.txt.`);
}

generateSitemaps();
