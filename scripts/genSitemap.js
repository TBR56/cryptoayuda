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
    { name: "Bitcoin", symbol: "BTC", type: "Layer 1", consensus: "Proof of Work (PoW)", year: 2009 },
    { name: "Ethereum", symbol: "ETH", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2015 },
    { name: "Tether", symbol: "USDT", type: "Stablecoin", consensus: "Fiat Backed", year: 2014 },
    { name: "BNB", symbol: "BNB", type: "Layer 1", consensus: "Proof of Staked Authority", year: 2017 },
    { name: "Solana", symbol: "SOL", type: "Layer 1", consensus: "PoH + PoS", year: 2020 },
    { name: "USDC", symbol: "USDC", type: "Stablecoin", consensus: "Fiat Backed", year: 2018 },
    { name: "XRP", symbol: "XRP", type: "Layer 1", consensus: "RPCA", year: 2012 },
    { name: "Dogecoin", symbol: "DOGE", type: "Meme Coin", consensus: "Proof of Work (PoW)", year: 2013 },
    { name: "Toncoin", symbol: "TON", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2018 },
    { name: "Cardano", symbol: "ADA", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2017 },
    { name: "Shiba Inu", symbol: "SHIB", type: "Meme Coin", consensus: "ERC-20 Token", year: 2020 },
    { name: "Avalanche", symbol: "AVAX", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2020 },
    { name: "Polkadot", symbol: "DOT", type: "Layer 0", consensus: "NPoS", year: 2020 },
    { name: "TRON", symbol: "TRX", type: "Layer 1", consensus: "DPoS", year: 2017 },
    { name: "Bitcoin Cash", symbol: "BCH", type: "Layer 1", consensus: "Proof of Work (PoW)", year: 2017 },
    { name: "Chainlink", symbol: "LINK", type: "Oracle", consensus: "ERC-20 Token", year: 2017 },
    { name: "Near Protocol", symbol: "NEAR", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2020 },
    { name: "Polygon", symbol: "MATIC", type: "Layer 2", consensus: "Proof of Stake (PoS)", year: 2017 },
    { name: "Litecoin", symbol: "LTC", type: "Layer 1", consensus: "Proof of Work (PoW)", year: 2011 },
    { name: "Internet Computer", symbol: "ICP", type: "Layer 1", consensus: "Threshold Relay", year: 2021 },
    { name: "Dai", symbol: "DAI", type: "Stablecoin", consensus: "Crypto Backed", year: 2017 },
    { name: "Uniswap", symbol: "UNI", type: "DeFi", consensus: "Governance Token", year: 2020 },
    { name: "Aptos", symbol: "APT", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2022 },
    { name: "Cosmos", symbol: "ATOM", type: "Layer 0", consensus: "Tendermint", year: 2019 },
    { name: "Stacks", symbol: "STX", type: "Layer 2", consensus: "Proof of Transfer (PoX)", year: 2019 },
    { name: "Filecoin", symbol: "FIL", type: "Storage", consensus: "Proof of Spacetime", year: 2020 },
    { name: "Render", symbol: "RNDR", type: "AI/Compute", consensus: "ERC-20 Token", year: 2017 },
    { name: "Hedera", symbol: "HBAR", type: "Layer 1", consensus: "Hashgraph", year: 2019 },
    { name: "Arbitrum", symbol: "ARB", type: "Layer 2", consensus: "Optimistic Rollup", year: 2023 },
    { name: "Optimism", symbol: "OP", type: "Layer 2", consensus: "Optimistic Rollup", year: 2022 },
    { name: "Maker", symbol: "MKR", type: "DeFi", consensus: "Governance Token", year: 2017 },
    { name: "Cronos", symbol: "CRO", type: "Layer 1", consensus: "Proof of Authority", year: 2018 },
    { name: "Kaspa", symbol: "KAS", type: "Layer 1", consensus: "BlockDAG PoW", year: 2021 },
    { name: "Pepe", symbol: "PEPE", type: "Meme Coin", consensus: "ERC-20 Token", year: 2023 },
    { name: "VeChain", symbol: "VET", type: "Layer 1", consensus: "Proof of Authority", year: 2015 },
    { name: "Ethereum Classic", symbol: "ETC", type: "Layer 1", consensus: "Proof of Work (PoW)", year: 2016 },
    { name: "Injective", symbol: "INJ", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2020 },
    { name: "Stellar", symbol: "XLM", type: "Layer 1", consensus: "SCP", year: 2014 },
    { name: "Monero", symbol: "XMR", type: "Privacy", consensus: "Proof of Work (PoW)", year: 2014 },
    { name: "OKB", symbol: "OKB", type: "Exchange Token", consensus: "ERC-20 Token", year: 2019 },
    { name: "Thorchain", symbol: "RUNE", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2018 },
    { name: "Celestia", symbol: "TIA", type: "Modular L1", consensus: "Proof of Stake (PoS)", year: 2023 },
    { name: "Immutable", symbol: "IMX", type: "Layer 2", consensus: "Validium", year: 2021 },
    { name: "Fantom", symbol: "FTM", type: "Layer 1", consensus: "Lachesis", year: 2018 },
    { name: "The Graph", symbol: "GRT", type: "Middleware", consensus: "Proof of Stake", year: 2020 },
    { name: "Algorand", symbol: "ALGO", type: "Layer 1", consensus: "PPoS", year: 2019 },
    { name: "Sei", symbol: "SEI", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2023 },
    { name: "Floki", symbol: "FLOKI", type: "Meme Coin", consensus: "ERC-20 / BEP-20", year: 2021 },
    { name: "Flow", symbol: "FLOW", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2020 },
    { name: "Bitget Token", symbol: "BGB", type: "Exchange Token", consensus: "ERC-20 Token", year: 2021 },
    { name: "Arweave", symbol: "AR", type: "Storage", consensus: "Proof of Access", year: 2018 },
    { name: "Bonk", symbol: "BONK", type: "Meme Coin", consensus: "SPL Token", year: 2022 },
    { name: "Jupiter", symbol: "JUP", type: "DeFi", consensus: "SPL Token", year: 2024 },
    { name: "Fetch.ai", symbol: "FET", type: "AI", consensus: "Proof of Stake (PoS)", year: 2019 },
    { name: "Ethena", symbol: "ENA", type: "DeFi", consensus: "ERC-20 Token", year: 2024 },
    { name: "Worldcoin", symbol: "WLD", type: "Identity", consensus: "Optimistic Rollup", year: 2023 },
    { name: "Bittensor", symbol: "TAO", type: "AI", consensus: "Proof of Intelligence", year: 2021 },
    { name: "Ondo", symbol: "ONDO", type: "RWA", consensus: "ERC-20 Token", year: 2024 },
    { name: "JasmyCoin", symbol: "JASMY", type: "IoT", consensus: "ERC-20 Token", year: 2021 },
    { name: "Mantra", symbol: "OM", type: "RWA", consensus: "Proof of Stake (PoS)", year: 2020 },
    { name: "SingularityNET", symbol: "AGIX", type: "AI", consensus: "ERC-20 Token", year: 2017 },
    { name: "Quant", symbol: "QNT", type: "Interop", consensus: "ERC-20 Token", year: 2018 },
    { name: "Lido DAO", symbol: "LDO", type: "DeFi", consensus: "Governance Token", year: 2020 },
    { name: "Bitcoin SV", symbol: "BSV", type: "Layer 1", consensus: "Proof of Work (PoW)", year: 2018 },
    { name: "Gala", symbol: "GALA", type: "Gaming", consensus: "ERC-20 Token", year: 2020 },
    { name: "Beam", symbol: "BEAM", type: "Gaming", consensus: "Avalanche Subnet", year: 2023 },
    { name: "Neo", symbol: "NEO", type: "Layer 1", consensus: "dBFT", year: 2014 },
    { name: "EOS", symbol: "EOS", type: "Layer 1", consensus: "DPoS", year: 2018 },
    { name: "Klaytn", symbol: "KLAY", type: "Layer 1", consensus: "IBFT", year: 2019 },
    { name: "IOTA", symbol: "IOTA", type: "Layer 1", consensus: "Tangle", year: 2016 },
    { name: "Tezos", symbol: "XTZ", type: "Layer 1", consensus: "LPoS", year: 2018 },
    { name: "Sandbox", symbol: "SAND", type: "Metaverse", consensus: "ERC-20 Token", year: 2011 },
    { name: "Decentraland", symbol: "MANA", type: "Metaverse", consensus: "ERC-20 Token", year: 2020 },
    { name: "Axie Infinity", symbol: "AXS", type: "Gaming", consensus: "ERC-20 Token", year: 2020 },
    { name: "Aave", symbol: "AAVE", type: "DeFi", consensus: "Governance Token", year: 2017 },
    { name: "Curve", symbol: "CRV", type: "DeFi", consensus: "Governance Token", year: 2020 },
    { name: "Synthetix", symbol: "SNX", type: "DeFi", consensus: "ERC-20 Token", year: 2017 },
    { name: "Compound", symbol: "COMP", type: "DeFi", consensus: "Governance Token", year: 2017 },
    { name: "PancakeSwap", symbol: "CAKE", type: "DeFi", consensus: "BEP-20 Token", year: 2020 },
    { name: "Mina", symbol: "MINA", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2021 },
    { name: "Chiliz", symbol: "CHZ", type: "Sports", consensus: "Proof of Authority", year: 2018 },
    { name: "Conflux", symbol: "CFX", type: "Layer 1", consensus: "Tree-Graph PoW", year: 2018 },
    { name: "dYdX", symbol: "DYDX", type: "DeFi", consensus: "Proof of Stake (PoS)", year: 2021 },
    { name: "eCash", symbol: "XEC", type: "Layer 1", consensus: "Proof of Work (PoW)", year: 2021 },
    { name: "Gnosis", symbol: "GNO", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2015 },
    { name: "KuCoin Token", symbol: "KCS", type: "Exchange Token", consensus: "ERC-20 Token", year: 2017 },
    { name: "GateToken", symbol: "GT", type: "Exchange Token", consensus: "PoS", year: 2019 },
    { name: "Nexo", symbol: "NEXO", type: "DeFi", consensus: "ERC-20 Token", year: 2018 },
    { name: "Pendle", symbol: "PENDLE", type: "DeFi", consensus: "ERC-20 Token", year: 2021 },
    { name: "Pyth Network", symbol: "PYTH", type: "Oracle", consensus: "Solana Token", year: 2023 },
    { name: "Wormhole", symbol: "W", type: "Interop", consensus: "Guardian Network", year: 2024 },
    { name: "Starknet", symbol: "STRK", type: "Layer 2", consensus: "ZK-Rollup", year: 2024 },
    { name: "Zcash", symbol: "ZEC", type: "Privacy", consensus: "Proof of Work (PoW)", year: 2016 },
    { name: "Dash", symbol: "DASH", type: "Payment", consensus: "X11 PoW", year: 2014 },
    { name: "Siacoin", symbol: "SC", type: "Storage", consensus: "Proof of Work (PoW)", year: 2015 },
    { name: "Ronin", symbol: "RON", type: "Gaming", consensus: "DPoS", year: 2021 },
    { name: "Kava", symbol: "KAVA", type: "Layer 1", consensus: "Proof of Stake (PoS)", year: 2019 },
    { name: "Helium", symbol: "HNT", type: "DePIN", consensus: "Proof of Coverage", year: 2019 },
    { name: "Zilliqa", symbol: "ZIL", type: "Layer 1", consensus: "Sharded PoW", year: 2017 },
    { name: "Blur", symbol: "BLUR", type: "NFT", consensus: "ERC-20 Token", year: 2023 }
];

const GUIDES_LOCAL = [
    "Cómo comprar {COIN}", "Dónde comprar {COIN} barato", "Impuestos {COIN}", "Es legal {COIN}",
    "Mejores Exchanges para {COIN}", "Comprar {COIN} con Tarjeta", "Comprar {COIN} con Transferencia",
    "Cajeros de {COIN}", "Quién acepta {COIN}", "Retirar {COIN} a Banco"
];

const GUIDES_GLOBAL = [
    "Predicción precio {COIN} 2025", "Es {COIN} una estafa?", "Opiniones sobre {COIN}",
    "Mejor Wallet para {COIN}", "Staking de {COIN}", "Minar {COIN} guía",
    "Futuro de {COIN}", "Análisis técnico {COIN}", "Noticias {COIN} última hora",
    "Ventajas y Desventajas de {COIN}", "Historia de {COIN}", "Creador de {COIN}",
    "Roadmap {COIN} 2025", "Comunidad {COIN}", "Seguridad de {COIN}",
    "Contrato inteligente de {COIN}", "Casos de uso {COIN}", "Competidores de {COIN}",
    "Whitepaper {COIN} explicado", "Tokenomics de {COIN}"
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

// PRODUCTION DOMAIN (hardcoded to ensure consistency)
const BASE_URL = 'https://www.cryptoayuda.org';
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

    // 5. Smart Guides (Global & Local) - SPLIT INTO 20 PARTS
    const guiaUrls = [];
    COINS.forEach(coin => {
        // GLOBAL GUIDES
        GUIDES_GLOBAL.forEach(g => {
            // FILTER 1: Mining (Only PoW)
            if (g.includes('Minar') && !coin.consensus.includes('Proof of Work')) return;
            // FILTER 2: Staking (Only PoS) - loose filter, mainly for pure PoW
            if (g.includes('Staking') && coin.consensus.includes('Proof of Work')) return;
            // FILTER 3: Predictions for Stablecoins
            if (g.includes('Predicción') && coin.type === 'Stablecoin') return;

            guiaUrls.push(`/guias/${slugify(g)}/${slugify(coin.name)}`);
        });

        // LOCAL GUIDES (Coin + Country)
        GUIDES_LOCAL.forEach(g => {
            PAISES.forEach(p => {
                guiaUrls.push(`/guias/${slugify(g)}/${slugify(coin.name)}/${slugify(p)}`);
            });
        });
    });

    // logic to split into 20 parts
    const totalGuias = guiaUrls.length;
    const parts = 20;
    const chunkSize = Math.ceil(totalGuias / parts);

    for (let i = 0; i < parts; i++) {
        const start = i * chunkSize;
        const end = start + chunkSize;
        const chunk = guiaUrls.slice(start, end);

        if (chunk.length > 0) {
            const fileName = `sitemap-guias-${i + 1}.xml`;
            writeSitemap(fileName, chunk, 0.8);
            sitemaps.push(fileName);
        }
    }

    // 6. Estafas
    const scamUrls = SCAM_TOPICS.map(t => `/estafas/${slugify(t)}`);
    writeSitemap('sitemap-estafas.xml', scamUrls, 0.7);
    sitemaps.push('sitemap-estafas.xml');

    // 7. News
    const newsUrls = [];
    COINS.forEach(coin => {
        TOPICS.forEach(topic => newsUrls.push(`/noticias/${slugify(coin.name)}/${slugify(topic)}`));
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

    // 11. Comparador Versus (The 5,000 Page Engine)
    const vsUrls = [];
    for (let i = 0; i < COINS.length; i++) {
        for (let j = i + 1; j < COINS.length; j++) {
            const c1 = slugify(COINS[i].name);
            const c2 = slugify(COINS[j].name);
            vsUrls.push(`/vs/${c1}-vs-${c2}`);
        }
    }
    // Limit to 4500 roughly per sitemap file or check if it fits. 5000 is fine for one XML.
    // However, splitting if it grows too big is good practice. 5k is safe.
    writeSitemap('sitemap-versus.xml', vsUrls, 0.7);
    sitemaps.push('sitemap-versus.xml');

    // 12. Programmatic Search Queries (5,000 pages)
    let searchQueries = [];
    try {
        const fileContent = fs.readFileSync('./lib/searchQueries.ts', 'utf8');
        // Extract slugs using regex instead of complex parsing for a simple script
        const slugMatches = fileContent.match(/"slug":\s*"([^"]+)"/g);
        if (slugMatches) {
            searchQueries = slugMatches.map(m => {
                const match = m.match(/"([^"]+)"$/);
                return `/busquedas-crypto/${match[1]}`;
            });
        }
    } catch (e) {
        console.error("Could not load searchQueries.ts for sitemap:", e.message);
    }

    if (searchQueries.length > 0) {
        // Split into chunks of 2500 if needed, but 5k fits in one sitemap (limit is 50k)
        writeSitemap('sitemap-busquedas.xml', searchQueries, 0.6);
        sitemaps.push('sitemap-busquedas.xml');
    }

    // 13. Sitemap Index
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
