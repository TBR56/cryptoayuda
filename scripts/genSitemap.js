const fs = require('fs');

// DATA SOURCES (MATCHES lib/data.ts for 5,000+ urls)
const EXCHANGES_LIST = [
    "Binance", "Coinbase", "Kraken", "KuCoin", "Bybit", "OKX", "Bitget", "Gate.io", "BingX", "MEXC",
    "HTX", "Bitfinex", "Bitstamp", "Gemini", "Crypto.com", "Phemex", "Poloniex", "LBank", "XT.com", "CoinEx",
    "BitMart", "AscendEX", "DigiFinex", "Deepcoin", "Zoomex", "Woo X", "Bitrue", "WhiteBIT", "CoinW", "Tapbit",
    "Upbit", "Bithumb", "Coinone", "Korbit", "Gopax", "bitFlyer", "Coincheck", "GMO Coin", "Indodax", "Tokocrypto",
    "Pintu", "Bitkub", "Satang Pro", "Coins.ph", "PDAX", "Paribu", "BtcTurk", "Bitlo", "MercadoBitcoin", "Foxbit",
    "Novadax", "BitcoinTrade", "Ripio", "Bitso", "Volabit", "Lemon Cash", "Buenbit", "Belo", "SatoshiTango", "ArgenBTC",
    "Decrypto", "TiendaCrypto", "LetsBit", "Buda", "Orionx", "CryptoMarket", "Luno", "VALR", "Swyftx", "CoinSpot",
    "Independent Reserve", "Digital Surrey", "Bitvavo", "Coinmerce", "LiteBit", "Young Platform", "The Rock Trading",
    "Bitpanda", "Coinfinity", "Bisenomic", "ZebPay", "WazirX", "CoinDCX", "Rain", "CoinMENA", "BitOasis"
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
    "Celestia", "Filecoin", "Internet Computer"
];

const GUIAS_TITLES = [
    "Cómo Comprar", "Es Seguro Invertir en", "Predicción de Precio 2025 para",
    "Mejor Wallet para", "Staking de", "Análisis Fundamental de", "Evitar Estafas con",
    "Comprar con PayPal", "Retirar a Cuenta Bancaria desde", "Configurar Metamask para",
    "Minería de", "Futura Regulación de", "Historial de Precios de", "Comparativa Crypto vs Fiat",
    "Errores comunes al enviar", "Cómo recuperar", "Mejor App para tradear", "Impuestos sobre",
    "Comprar sin comisiones", "Intercambio P2P de", "Seguridad Avanzada para", "Préstamos con colateral en"
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
    "Privacidad Monero", "Scalability L2", "NFT Utility", "Stablecoin Regulation", "CBDC Launch"
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

// THE DOMAIN MUST MATCH Production
const BASE_URL = 'https://cryptoayudahoy.vercel.app';

function generateSitemap() {
    const urls = ['/'];

    // Hubs
    const hubs = [
        'reviews', 'comparar', 'noticias', 'guias', 'estafas', 'seguridad',
        'wallets', 'comparativas', 'faq', 'contacto', 'sobre-nosotros',
        'privacidad', 'terminos', 'disclaimer', 'servicios', 'problemas'
    ];
    hubs.forEach(h => urls.push(`/${h}`));

    // Reviews (Full List)
    EXCHANGES_LIST.forEach(ex => urls.push(`/reviews/${slugify(ex)}`));

    // Opiniones (Exchanges x Paises) ~2,300
    EXCHANGES_LIST.forEach(ex => {
        PAISES.forEach(p => urls.push(`/opiniones/${slugify(ex)}/${slugify(p)}`));
    });

    // Problemas (Exchanges x Probleme Slugs) ~1,400
    EXCHANGES_LIST.forEach(ex => {
        PROBLEMAS.forEach(prob => urls.push(`/problemas/${slugify(ex)}/${prob}`));
    });

    // Guias (Coins x Titles) ~660
    COINS.forEach(coin => {
        GUIAS_TITLES.forEach(g => urls.push(`/guias/${slugify(g)}/${slugify(coin)}`));
    });

    // Guias Localizadas (Subset to reach ~5000+ total)
    COINS.slice(0, 10).forEach(coin => {
        GUIAS_TITLES.slice(0, 10).forEach(g => {
            PAISES.slice(0, 10).forEach(p => urls.push(`/guias/${slugify(g)}/${slugify(coin)}/${slugify(p)}`));
        });
    });

    // Estafas (Topics)
    SCAM_TOPICS.forEach(t => urls.push(`/estafas/${slugify(t)}`));

    // News (Coins x Topics) ~570
    COINS.forEach(coin => {
        TOPICS.forEach(t => urls.push(`/noticias/${slugify(coin)}/${slugify(t)}`));
    });

    // Diagnóstico (Exchanges x Problems) ~1,400
    EXCHANGES_LIST.forEach(ex => {
        urls.push(`/diagnostico/${slugify(ex)}`);
        PROBLEMAS.forEach(prob => {
            urls.push(`/diagnostico/${slugify(ex)}/${prob}`);
        });
    });

    // Diagnóstico Localizado (Subset: Top 5 Exchanges x top 10 Paises x All Problems) ~850
    EXCHANGES_LIST.slice(0, 5).forEach(ex => {
        PAISES.slice(0, 10).forEach(p => {
            PROBLEMAS.forEach(prob => {
                urls.push(`/diagnostico/${slugify(ex)}/${slugify(p)}/${prob}`);
            });
        });
    });

    console.log(`Generating sitemap with ${urls.length} URLs...`);

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

    const robots = `User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml`;
    fs.writeFileSync('./public/robots.txt', robots);

    console.log(`Success: Sitemap and robots.txt written to /public`);
}

generateSitemap();
