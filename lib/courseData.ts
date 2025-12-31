export type Lesson = {
    id: string;
    title: string;
    duration: string; // e.g. "45 min"
    description: string;
    type: 'video' | 'text' | 'quiz';
};

export type Module = {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
};

export type CoursePlan = {
    id: string;
    name: string;
    totalDuration: string;
    description: string;
    modules: Module[];
};

const COMMON_MODULES: Record<string, Module> = {
    // BASE MODULES
    INTRO_CRYPTO: {
        id: "m_intro",
        title: "Introducción al Mundo Cripto",
        description: "Entiende qué son y por qué tienen valor.",
        lessons: [
            { id: "l1_money", title: "Historia del Dinero y el Problema Fiat", duration: "45 min", description: "Por qué tu dinero pierde valor.", type: "video" },
            { id: "l2_btc", title: "¿Qué es Bitcoin y Blockchain?", duration: "60 min", description: "La tecnología explicada simple.", type: "video" },
            { id: "l3_eth", title: "Ethereum y Contratos Inteligentes", duration: "50 min", description: "La computadora mundial.", type: "video" }
        ]
    },
    WALLETS_SEGURIDAD: {
        id: "m_security",
        title: "Wallets y Seguridad Esencial",
        description: "Custodial vs No Custodial. Tu primera barrera de defensa.",
        lessons: [
            { id: "l4_wallets", title: "Tipos de Billeteras (Hot vs Cold)", duration: "60 min", description: "Metamask, Ledger, Trezor.", type: "video" },
            { id: "l5_seed", title: "La Frase Semilla: Gestión Vital", duration: "45 min", description: "Cómo guardarla (y cómo no).", type: "video" },
            { id: "l6_mistakes", title: "Errores Comunes y Prevención de Estafas", duration: "90 min", description: "Phishing, SIM Swapping y más.", type: "video" }
        ]
    },
    GLOSARIO: {
        id: "m_glossary",
        title: "Glosario Cripto Fundamental",
        description: "Habla el idioma del mercado.",
        lessons: [
            { id: "l7_terms", title: "Diccionario Cripto A-Z", duration: "60 min", description: "FOMO, FUD, ATH, HODL explicados.", type: "text" }
        ]
    },

    // PRO MODULES
    ANALISIS_MERCADO: {
        id: "m_analysis",
        title: "Análisis y Operativa Real",
        description: "Aprende a evaluar proyectos y operar.",
        lessons: [
            { id: "l8_projects", title: "Análisis Fundamental de Proyectos", duration: "90 min", description: "Tokenomics y utilidad real.", type: "video" },
            { id: "l9_exchanges", title: "Dominando Exchanges Centralizados", duration: "60 min", description: "Binance, Bybit: Spot y Retiros.", type: "video" },
            { id: "l10_defi_intro", title: "Introducción a DeFi", duration: "80 min", description: "DEXs y Swaps básicos.", type: "video" },
            { id: "l11_stablecoins", title: "Stablecoins: Tipos y Riesgos", duration: "50 min", description: "USDT, USDC, DAI.", type: "video" }
        ]
    },
    GESTION_RIESGO: {
        id: "m_risk",
        title: "Gestión de Riesgo y Psicología",
        description: "Protege tu capital antes de intentar multiplicarlo.",
        lessons: [
            { id: "l12_risk", title: "Matemática de la Gestión de Riesgo", duration: "90 min", description: "Position Sizing y Ratios.", type: "video" },
            { id: "l13_psycho", title: "Psicología del Inversor", duration: "60 min", description: "Control emocional en volatilidad.", type: "video" },
            { id: "l14_cases", title: "Casos Reales y Errores de Mercado", duration: "90 min", description: "Análisis de colapsos históricos (FTX, Luna).", type: "video" }
        ]
    },

    // MASTERY MODULES
    DEFI_AVANZADO: {
        id: "m_defi_adv",
        title: "DeFi Avanzado y Web3",
        description: "Estrategias complejas on-chain.",
        lessons: [
            { id: "l15_yield", title: "Yield Farming y Liquidity Mining", duration: "120 min", description: "Generar rentabilidad pasiva.", type: "video" },
            { id: "l16_bridges", title: "Bridges y Layer 2", duration: "90 min", description: "Arbitrum, Optimism y Cross-chain.", type: "video" },
            { id: "l17_nfts", title: "NFTs: Utilidad Real vs Hype", duration: "60 min", description: "Membresías y arte digital.", type: "video" }
        ]
    },
    ESTRATEGIAS_PRO: {
        id: "m_strategies",
        title: "Estrategias y Marco Legal",
        description: "Frameworks profesionales para largo plazo.",
        lessons: [
            { id: "l18_fiscal", title: "Gestión Fiscal Básica", duration: "60 min", description: "Impuestos y reporte (General).", type: "text" },
            { id: "l19_macro", title: "Estrategias de Ciclo Completo", duration: "100 min", description: "Entrada y Salida óptima.", type: "video" },
            { id: "l20_scam_adv", title: "Auditoría de Smart Contracts (Básico)", duration: "90 min", description: "Detectar Honeypots y Rugs por código.", type: "video" }
        ]
    }
};

export const COURSES: Record<string, CoursePlan> = {
    "base": {
        id: "plan_base",
        name: "Crypto Base",
        totalDuration: "6-8 Horas",
        description: "Tu entrada segura al ecosistema. Evita errores costosos.",
        modules: [
            COMMON_MODULES.INTRO_CRYPTO,
            COMMON_MODULES.WALLETS_SEGURIDAD,
            COMMON_MODULES.GLOSARIO
        ]
    },
    "pro": {
        id: "plan_pro",
        name: "Crypto Pro",
        totalDuration: "15-20 Horas",
        description: "Opera con criterio. Análisis, DeFi y Gestión de Riesgo.",
        modules: [
            COMMON_MODULES.INTRO_CRYPTO,
            COMMON_MODULES.WALLETS_SEGURIDAD,
            COMMON_MODULES.GLOSARIO,
            COMMON_MODULES.ANALISIS_MERCADO,
            COMMON_MODULES.GESTION_RIESGO
        ]
    },
    "mastery": {
        id: "plan_mastery",
        name: "Crypto Mastery",
        totalDuration: "+25 Horas",
        description: "Dominio total. Estrategias avanzadas, Web3 y Ciclos.",
        modules: [
            COMMON_MODULES.INTRO_CRYPTO,
            COMMON_MODULES.WALLETS_SEGURIDAD,
            COMMON_MODULES.GLOSARIO,
            COMMON_MODULES.ANALISIS_MERCADO,
            COMMON_MODULES.GESTION_RIESGO,
            COMMON_MODULES.DEFI_AVANZADO,
            COMMON_MODULES.ESTRATEGIAS_PRO
        ]
    }
};
