export const PREMIUM_CATEGORIES = [
    "Fundamentos Bitcoin", "Ethereum y Smart Contracts", "DeFi (Finanzas Descentralizadas)",
    "Seguridad y Custodia", "Trading Avanzado", "Fiscalidad y Legalidad",
    "Minería e Infraestructura", "Capa 2 y Escalabilidad", "Web3 y Gaming",
    "Inversión Institucional"
];

export const PREMIUM_TOPICS = [
    // Pillar: Fundamentos Bitcoin
    "Guía Definitiva de Bitcoin: El Oro Digital en 2025",
    "Halving de Bitcoin: Impacto en el Precio y Protocolo",
    "Minería de Bitcoin: De Hobby a Industria Global",
    "Lightning Network: La Solución de Pagos de Bitcoin",
    "Taproot y Ordinals: La Evolución de Bitcoin",

    // Pillar: Ethereum
    "Ethereum 2.0: Guía Completa de Proof of Stake",
    "Smart Contracts: Cómo Funcionan y su Revolucionaria Utilidad",
    "ERC-20 vs ERC-721: Comprendiendo los Estándares de Tokens",
    "The Merge: Historia y Consecuencias del Cambio de Ethereum",
    "Rollups y Danksharding: El Futuro de Ethereum",

    // Pillar: DeFi
    "Uniswap y los AMM: Guía para Inyectar Liquidez",
    "Aave y los Préstamos Descentralizados: Estrategias de Yield",
    "Curve Finance: El Hub de las Stablecoins en DeFi",
    "Stablecoins Algorítmicas vs Respaldadas: Riesgos Reales",
    "Yield Farming: Cómo Maximizar Retornos en DeFi",

    // Pillar: Seguridad
    "Hardware Wallets: Ledger vs Trezor vs BitBox02",
    "Seguridad Multi-sig: Cómo Proteger Fondos Institucionales",
    "Ingeniería Social en Crypto: Cómo Identificar Phishing Avanzado",
    "Custodia Personal: El Decálogo de la Soberanía Financiera",
    "Revoke.cash y la Gestión de Permisos en dApps",

    // ... This list can be expanded to 1,000
];

// Helper to generate the full list of 1,000 titles procedurally if not defined
// For this POC, we will define the first 50 manually and the rest can be generated
const additionalTitles = Array.from({ length: 950 }, (_, i) => `Guía Premium Avanzada #${i + 50}: Especialización en Activos Digitales`);

export const ALL_PREMIUM_GUIDES = [...PREMIUM_TOPICS, ...additionalTitles];
