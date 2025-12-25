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
    "Bitpanda", "Coinfinity", "Bisenomic", "ZebPay", "WazirX", "CoinDCX", "Rain", "CoinMENA", "BitOasis",
    "Bluebit", "Dex-Trade", "ProBit", "Azbit", "Latoken", "Finexbox", "FMFW.io", "CEX.io", "EXMO", "HitBTC",
    "YoBit", "Mercatox", "Tidex", "STEX", "Kanga", "LocalCoinsSwap", "Paxful", "Bisq", "HodlHodl"
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
    "Privacidad Monero", "Scalability L2", "NFT Utility", "Stablecoin Regulation", "CBDC Launch",
    "Minería con GPU", "Proof of Work vs Stake", "Inteligencia Artificial y Crypto", "DePIN", "Real World Assets (RWA)",
    "Billeteras Frías", "Libertad Financiera", "Inflación y Cripto", "Web3 Gaming", "Metaverso 2025"
];

export const COINS = [
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

// Categorized Guides for Smart Generation
export const GUIDES_LOCAL = [
    "Cómo comprar {COIN}", "Dónde comprar {COIN} barato", "Impuestos {COIN}", "Es legal {COIN}",
    "Mejores Exchanges para {COIN}", "Comprar {COIN} con Tarjeta", "Comprar {COIN} con Transferencia",
    "Cajeros de {COIN}", "Quién acepta {COIN}", "Retirar {COIN} a Banco"
];

export const GUIDES_GLOBAL = [
    "Predicción precio {COIN} 2025", "Es {COIN} una estafa?", "Opiniones sobre {COIN}",
    "Mejor Wallet para {COIN}", "Staking de {COIN}", "Minar {COIN} guía",
    "Futuro de {COIN}", "Análisis técnico {COIN}", "Noticias {COIN} última hora",
    "Ventajas y Desventajas de {COIN}", "Historia de {COIN}", "Creador de {COIN}",
    "Roadmap {COIN} 2025", "Comunidad {COIN}", "Seguridad de {COIN}",
    "Contrato inteligente de {COIN}", "Casos de uso {COIN}", "Competidores de {COIN}",
    "Whitepaper {COIN} explicado", "Tokenomics de {COIN}"
];

export const GUIAS_TITLES = [...GUIDES_LOCAL, ...GUIDES_GLOBAL].map(t => t.replace(" {COIN}", ""));

export const TRUST_FACTORS = [
    { name: "Licencia Regulatoria", slug: "licencia" },
    { name: "Pruebas de Reserva (PoR)", slug: "reservas" },
    { name: "Antigüedad en el Mercado", slug: "antiguedad" },
    { name: "Seguridad de Fondos", slug: "seguridad-fondos" },
    { name: "Atención al Cliente", slug: "soporte" },
    { name: "Transparencia de Tarifas", slug: "tarifas" }
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

