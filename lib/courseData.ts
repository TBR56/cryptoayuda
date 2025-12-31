export type ContentType = 'video' | 'reading' | 'practice' | 'simulation' | 'case_study' | 'quiz' | 'challenge';

// Types
export interface Question {
    id: string;
    text: string;
    options: string[];
    correctOptionIndex: number; // 0-3
    explanation: string;
}

export const QUESTION_BANK: Record<string, Question[]> = {
    'm1_fund': [
        {
            id: 'q1',
            text: '¿Cuál es la característica principal que hace a Bitcoin resistente a la censura?',
            options: ['Encriptación militar', 'Descentralización de nodos', 'Respaldo del gobierno', 'Velocidad de red'],
            correctOptionIndex: 1,
            explanation: 'La descentralización impide que un solo actor controle o apague la red.'
        },
        {
            id: 'q2',
            text: '¿Qué es una Seed Phrase?',
            options: ['Una contraseña de correo', 'El respaldo maestro de tu wallet', 'El código de un contrato inteligente', 'Un token de acceso'],
            correctOptionIndex: 1,
            explanation: 'Es la llave maestra que permite recuperar tus fondos en cualquier dispositivo.'
        },
        {
            id: 'q3',
            text: '¿Qué significa "Not your keys, not your coins"?',
            options: ['Si pierdes la llave pierdes las monedas', 'Si no custodias tus claves privadas, no eres dueño real de los fondos', 'Las monedas son físicas', 'Debes usar llaves USB'],
            correctOptionIndex: 1,
            explanation: 'Refiere al riesgo de custodia en exchanges centralizados.'
        },
    ],
    'm2_ana': [
        {
            id: 'q4',
            text: '¿Qué mide el Market Cap?',
            options: ['El precio de la moneda', 'El volumen de trading', 'Precio actual x Circulating Supply', 'El dinero total invertido'],
            correctOptionIndex: 2,
            explanation: 'Es una métrica de dimensión relativa, no de flujo de dinero.'
        }
    ]
};

export interface Lesson {
    id: string;
    title: string;
    type: ContentType;
    duration: string; // e.g., "45 min"
    description: string;
    isMandatory: boolean;
    requiresPassing: boolean; // For quizzes/challenges
}

export interface QuizMetadata {
    timeLimitSeconds: number;
    passingScore: number; // e.g. 85
    maxAttempts: number;
    questionBankSize: number; // Total available questions
    questionsToAsk: number; // Questions shown per attempt
    randomizeOrder: boolean;
}

export interface Module {
    id: string;
    title: string;
    description: string;
    lessons: Lesson[];
    finalExam?: QuizMetadata;
    practicalChallenge?: {
        title: string;
        description: string;
        checklist: string[];
    };
}

export interface CoursePlan {
    id: string;
    name: string; // Professional Name
    level: 'Inicial' | 'Profesional' | 'Avanzado';
    price: {
        ars: number;
        usd: number; // Crypto/USDT price
    };
    totalHours: string; // "XX Horas Efectivas"
    description: string;
    competencies: string[]; // Skills certified
    careerOutcomes: string[]; // Job roles
    modules: Module[];
    certification: {
        name: string;
        idPrefix: string; // e.g. "CYKA-FND-"
        requiresIdentityVerification: boolean;
    };
}

// --- MODULE DEFINITIONS ---

const MODULE_INTRO_SEC: Module = {
    id: "m1_fund",
    title: "Fundamentos y Seguridad Defensiva",
    description: "La base técnica ineludible. Sin esto, perderás dinero.",
    lessons: [
        { id: "l1_hist", title: "Dinero Fiat vs Hard Money", type: "video", duration: "45 min", description: "Teoría monetaria aplicada.", isMandatory: true, requiresPassing: false },
        { id: "l2_blockchain", title: "Mecánica Blockchain: Mempool y Bloques", type: "video", duration: "60 min", description: "Cómo funciona realmente una transacción.", isMandatory: true, requiresPassing: false },
        { id: "l3_wallets_sim", title: "Simulación: Configuración Cold Wallet", type: "simulation", duration: "90 min", description: "Práctica interactiva de generación de semillas.", isMandatory: true, requiresPassing: true },
        { id: "l4_phishing", title: "Laboratorio de Phishing Real", type: "case_study", duration: "60 min", description: "Identifica 10 correos fraudulentos reales.", isMandatory: true, requiresPassing: true }
    ],
    finalExam: { timeLimitSeconds: 1200, passingScore: 90, maxAttempts: 3, questionBankSize: 50, questionsToAsk: 20, randomizeOrder: true },
    practicalChallenge: {
        title: "Creación de Bóveda Personal",
        description: "Configurar una billetera, respaldar semilla en medio físico y realizar una transacción de prueba.",
        checklist: ["Semilla offline generada", "Transacción recibida", "Transacción enviada", "Billetera borrada y restaurada"]
    }
};

const MODULE_ANALYSIS: Module = {
    id: "m2_ana",
    title: "Análisis Fundamental y On-Chain",
    description: "Distinguir valor real de humo y marketing.",
    lessons: [
        { id: "l5_tokenomics", title: "Auditoría de Tokenomics", type: "video", duration: "90 min", description: "Vesting, Inflación y Distribución.", isMandatory: true, requiresPassing: false },
        { id: "l6_onchain", title: "Análisis On-Chain (Whale Watching)", type: "practice", duration: "120 min", description: "Uso de exploradores de bloques para rastrear fondos.", isMandatory: true, requiresPassing: true },
        { id: "l7_scam_invert", title: "Ingeniería Inversa de una Estafa", type: "case_study", duration: "90 min", description: "Desarmando el caso Squid Game Token.", isMandatory: true, requiresPassing: true }
    ],
    finalExam: { timeLimitSeconds: 1800, passingScore: 85, maxAttempts: 2, questionBankSize: 60, questionsToAsk: 25, randomizeOrder: true }
};

const MODULE_TRADING: Module = {
    id: "m3_trade",
    title: "Operativa de Mercado y Riesgo",
    description: "Gestión profesional de capital.",
    lessons: [
        { id: "l8_math", title: "Matemática de la Esperanza Matemática", type: "video", duration: "60 min", description: "Por qué el 90% pierde.", isMandatory: true, requiresPassing: false },
        { id: "l9_orderflow", title: "Lectura de Order Flow", type: "video", duration: "90 min", description: "Más allá del análisis técnico básico.", isMandatory: true, requiresPassing: false },
        { id: "l10_sim_trade", title: "Simulador de Trading en Tiempo Real", type: "simulation", duration: "10 Horas", description: "Operar paper-money con condiciones de mercado real.", isMandatory: true, requiresPassing: true }
    ],
    presentationChallenge: {
        title: "Bitácora de Trading Auditada",
        description: "Presentar un historial de 50 operaciones simuladas con justificación técnica y gestión de riesgo documentada.",
        checklist: ["50 Trades ejecutados", "Riesgo máximo 1% por trade", "Bitácora completa", "Ratio de acierto calculado"]
    }
} as any; // Cast needed because practicalChallenge key differs slightly in concept but fits schema

const MODULE_DEFI: Module = {
    id: "m4_defi",
    title: "Finanzas Descentralizadas (DeFi)",
    description: "Sistemas financieros sin intermediarios.",
    lessons: [
        { id: "l11_amm", title: "Mecánica de AMMs (Uniswap v3)", type: "video", duration: "100 min", description: "Impermanent Loss y Liquidez Concentrada.", isMandatory: true, requiresPassing: false },
        { id: "l12_lending", title: "Protocolos de Lending (Aave/Compound)", type: "practice", duration: "90 min", description: "Estrategias de Loop y riesgos de liquidación.", isMandatory: true, requiresPassing: true },
        { id: "l13_hacks", title: "Post-Mortem de Hacks DeFi", type: "case_study", duration: "120 min", description: "Análisis técnico de Flash Loan Attacks.", isMandatory: true, requiresPassing: true }
    ],
    finalExam: { timeLimitSeconds: 2400, passingScore: 90, maxAttempts: 2, questionBankSize: 80, questionsToAsk: 30, randomizeOrder: true }
};

const MODULE_AUDIT: Module = {
    id: "m5_audit",
    title: "Auditoría Técnica y Fiscal",
    description: "Validación de contratos y cumplimiento legal.",
    lessons: [
        { id: "l14_contract", title: "Lectura de Smart Contracts (Solidity)", type: "video", duration: "150 min", description: "Detectar funciones maliciosas (Honeypots).", isMandatory: true, requiresPassing: true },
        { id: "l15_taxes", title: "Estrategia Fiscal Internacional", type: "video", duration: "90 min", description: "Optimización legal de cargas impositivas.", isMandatory: true, requiresPassing: false },
        { id: "l16_final_sim", title: "Simulación: El Auditor", type: "simulation", duration: "5 Horas", description: "Auditar 3 proyectos pre-lanzamiento y emitir veredicto.", isMandatory: true, requiresPassing: true }
    ],
    practicalChallenge: {
        title: "Tesis de Inversión Institucional",
        description: "Desarrollar una tesis completa de inversión para un fondo institucional sobre un protocolo DeFi emergente.",
        checklist: ["Auditoría de Código", "Análisis de Mercado", "Reporte de Riesgos", "Proyección de Retorno"]
    }
};

// --- COURSE DEFINITIONS ---

export const COURSES: Record<string, CoursePlan> = {
    "base": { // Mapped to internal ID 'base' for URL compatibility
        id: "plan_base_v2",
        name: "PROGRAMA 1: FUNDAMENTOS CRIPTO CERTIFICADOS",
        level: "Inicial",
        price: { ars: 35000, usd: 29 },
        totalHours: "12 Horas Efectivas",
        description: "Certificación de competencia en seguridad operativa y custodia de activos digitales. Aprende a no perder dinero.",
        competencies: ["Autocustodia Avanzada", "Detección de Phishing", "Operativa Blockchain", "Seguridad OpSec"],
        careerOutcomes: ["Inversor Minorista Seguro", "Soporte Técnico Cripto Jr."],
        modules: [MODULE_INTRO_SEC],
        certification: {
            name: "Certificado de Seguridad Operativa Cripto (CSOC)",
            idPrefix: "CSOC-",
            requiresIdentityVerification: true
        }
    },
    "pro": {
        id: "plan_pro_v2",
        name: "PROGRAMA 2: OPERADOR CRIPTO PROFESIONAL",
        level: "Profesional",
        price: { ars: 70000, usd: 59 },
        totalHours: "40 Horas Efectivas",
        description: "Formación integral para operar en el mercado con criterios profesionales de análisis y gestión de riesgo.",
        competencies: ["Análisis Fundamental", "Gestión de Riesgo Patrimonial", "Operativa de Exchanges", "Psicología de Mercado"],
        careerOutcomes: ["Trader Independiente", "Analista de Investigación Jr.", "Asesor de Cartera Personal"],
        modules: [MODULE_INTRO_SEC, MODULE_ANALYSIS, MODULE_TRADING],
        certification: {
            name: "Certificado de Operador de Mercados Digitales (COMD)",
            idPrefix: "COMD-",
            requiresIdentityVerification: true
        }
    },
    "mastery": {
        id: "plan_mastery_v2",
        name: "PROGRAMA 3: ESPECIALISTA CRIPTO AVANZADO",
        level: "Avanzado",
        price: { ars: 120000, usd: 99 },
        totalHours: "80 Horas Efectivas",
        description: "El máximo nivel de competencia. DeFi, Auditoría y Estrategias Institucionales.",
        competencies: ["Arquitectura DeFi", "Auditoría de Smart Contracts", "Estrategia Yield Farming", "Consultoría Fiscal Cripto"],
        careerOutcomes: ["Consultor Blockchain", "Auditor de Seguridad Jr.", "Gestor de Fondos DeFi", "Investigador On-Chain"],
        modules: [MODULE_INTRO_SEC, MODULE_ANALYSIS, MODULE_TRADING, MODULE_DEFI, MODULE_AUDIT],
        certification: {
            name: "Certificado de Especialista en Finanzas Descentralizadas (CEFD)",
            idPrefix: "CEFD-",
            requiresIdentityVerification: true
        }
    }
};
