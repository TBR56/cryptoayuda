// 1. DATA SOURCES: THE 1,000+ ENGINE (PRODUCTION READY)
export const EXCHANGES_LIST = [
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

export const PAISES = [
    "Argentina", "México", "España", "Colombia", "Chile", "Perú",
    "Uruguay", "Paraguay", "Bolivia", "Ecuador", "Venezuela",
    "Panamá", "Costa Rica", "República Dominicana", "Guatemala",
    "El Salvador", "Honduras", "Nicaragua", "Cuba", "Puerto Rico",
    "Estados Unidos", "Brasil", "Portugal", "Andorra", "Francia", "Italia", "Alemania", "Reino Unido"
];

export const TOPICS = [
    "Regulación SEC", "Adopción Institucional", "Halving de Bitcoin", "Upgrade Dencun", "Hackeo en DeFi",
    "Listado en Binance", "Rumores de ETF Spot", "Asociación con Visa", "Lanzamiento de Mainnet",
    "Quema de Tokens (Burn)", "Airdrop Masivo", "Demanda Legal", "Impuestos Crypto", "Minería Sostenible",
    "Privacidad Monero", "Scalability L2", "NFT Utility", "Stablecoin Regulation", "CBDC Launch"
];

export const COINS = [
    { name: "Bitcoin", symbol: "BTC" }, { name: "Ethereum", symbol: "ETH" }, { name: "Solana", symbol: "SOL" },
    { name: "Cardano", symbol: "ADA" }, { name: "Ripple", symbol: "XRP" }, { name: "Polkadot", symbol: "DOT" },
    { name: "Dogecoin", symbol: "DOGE" }, { name: "Shiba Inu", symbol: "SHIB" }, { name: "Avalanche", symbol: "AVAX" },
    { name: "Polygon", symbol: "MATIC" }, { name: "Litecoin", symbol: "LTC" }, { name: "Chainlink", symbol: "LINK" },
    { name: "Stellar", symbol: "XLM" }, { name: "Binance Coin", symbol: "BNB" }, { name: "Tron", symbol: "TRX" },
    { name: "Monero", symbol: "XMR" }, { name: "Cosmos", symbol: "ATOM" }, { name: "Algorand", symbol: "ALGO" },
    { name: "Near Protocol", symbol: "NEAR" }, { name: "Aptos", symbol: "APT" }, { name: "Sui", symbol: "SUI" },
    { name: "Pepe", symbol: "PEPE" }, { name: "Arbitrum", symbol: "ARB" }, { name: "Optimism", symbol: "OP" },
    { name: "Render", symbol: "RNDR" }, { name: "Kaspa", symbol: "KAS" }, { name: "Injective", symbol: "INJ" },
    { name: "Celestia", symbol: "TIA" }, { name: "Filecoin", symbol: "FIL" }, { name: "Internet Computer", symbol: "ICP" }
];

export const GUIAS_TITLES = [
    "Cómo Comprar", "Es Seguro Invertir en", "Predicción de Precio 2025 para",
    "Mejor Wallet para", "Staking de", "Análisis Fundamental de", "Evitar Estafas con",
    "Comprar con PayPal", "Retirar a Cuenta Bancaria desde", "Configurar Metamask para",
    "Minería de", "Futura Regulación de", "Historial de Precios de", "Comparativa: {COIN} vs Fiat",
    "Errores comunes al enviar", "Cómo recuperar", "Mejor App para tradear", "Impuestos sobre",
    "Comprar sin comisiones", "Intercambio P2P de", "Seguridad Avanzada para", "Préstamos con colateral en"
];

export const GUIA_CATEGORIES = [
    "Principiantes", "Expertos", "Seguridad", "Inversión", "Técnico", "Legal"
];

export const SCAM_TOPICS = [
    "Esquemas Ponzi", "Phishing con Airdrops", "Estafas de Romance (Pig Butchering)",
    "Fake Exchanges", "Rug Pulls en DeFi", "Malware en Wallets", "Suplantación de Identidad",
    "Estafas de Minería en la Nube", "Grupos de Telegram Falsos", "Giveaways de Elon Musk",
    "Hack de Sims Swapping", "Inversores Falsos en LinkedIn", "Apps de Trading Falsas", "Webs de Arbitraje Falsas"
];

export const SECURITY_GUIDES = [
    "Cómo revocar permisos (Revoke.cash)", "Configurar 2FA con Yubikey", "Detectar contratos maliciosos",
    "Verificar URLs oficiales", "Resguardar Frase Semilla", "Auditoría de Smart Contracts básica",
    "Uso de Hardware Wallets (Ledger/Trezor)", "Identificar Correos de Phishing", "VPN para Cripto", "Privacy Browsing"
];

export const PROBLEMAS = [
    { slug: "cuenta-suspendida", title: "Cuenta Suspendida / Bloqueada", severity: "Alta" },
    { slug: "fondos-retenidos", title: "Fondos Retenidos por Riesgo", severity: "Critica" },
    { slug: "kyc-rechazado", title: "Verificación KYC Rechazada", severity: "Media" },
    { slug: "retiro-pendiente", title: "Retiro Pendiente (Processing)", severity: "Alta" },
    { slug: "deposito-no-acreditado", title: "Depósito Bancario No Acreditado", severity: "Alta" },
    { slug: "phishing", title: "¿Es este correo Phishing?", severity: "Critica" },
    { slug: "error-2fa", title: "Código 2FA Inválido / Perdido", severity: "Critica" },
    { slug: "api-error", title: "Error de Conexión API (Invalid Key)", severity: "Baja" },
    { slug: "app-lenta", title: "App Lenta, Trabada o Lag", severity: "Baja" },
    { slug: "login-imposible", title: "No puedo iniciar sesión (Login Loop)", severity: "Alta" },
    { slug: "tarjeta-rechazada", title: "Tarjeta de Crédito Rechazada", severity: "Media" },
    { slug: "p2p-estafa", title: "Estafa en Comercio P2P", severity: "Critica" },
    { slug: "comisiones-altas", title: "Cobro de Comisiones Excesivas", severity: "Media" },
    { slug: "cuenta-hackeada", title: "Cuenta Hackeada / Robada", severity: "Critica" },
    { slug: "cambio-email", title: "No llega email de confirmación", severity: "Baja" },
    { slug: "limite-excedido", title: "Límite de Retiro Excedido", severity: "Media" },
    { slug: "error-red", title: "Fondos enviados por red equivocada", severity: "Alta" }
];

export const CATEGORIAS_EXTRA = [
    { slug: "comisiones", title: "Comisiones y Fees", icon: "💸" },
    { slug: "staking", title: "Staking y Earn", icon: "📈" },
    { slug: "seguridad", title: "Seguridad y Licencias", icon: "🔒" },
    { slug: "app", title: "App Móvil y Web", icon: "📱" },
    { slug: "futuros", title: "Trading de Futuros", icon: "🎰" },
    { slug: "estafas", title: "Detector de Estafas", icon: "🛡️" }
];

