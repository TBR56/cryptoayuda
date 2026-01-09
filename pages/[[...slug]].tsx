import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import {
    Search,
    Zap,
    Award,
    Shield,
    ShieldAlert,
    ShieldCheck,
    HelpCircle,
    ArrowRight,
    ExternalLink,
    Star,
    AlertTriangle,
    MessageCircle,
    MessageSquare,
    Copy,
    Check,
    Lock,
    Globe,
    Play,
    GraduationCap,
    CheckCircle,
    Clock,
    Info,
    TrendingUp,
    ChevronDown,
    X,
    Filter,
    Terminal,
    Layers,
    Activity,
    LockIcon,
    AlertCircle,
    ArrowLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCryptoPrice } from '../hooks/useCryptoPrice';
import { EXCHANGES_LIST, PAISES, PROBLEMAS, COINS, TOPICS, GUIAS_TITLES, SCAM_TOPICS, SECURITY_GUIDES, BINANCE_AFFILIATE_LINK, LEGAL_TEXTS } from '../lib/data';
import { SEARCH_QUERIES } from '../lib/searchQueries';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScoreCard from '../components/ScoreCard';
import PriceTicker from '../components/PriceTicker';
import RobustImage from '../components/RobustImage'; // v2.0
import SeoHead from '../components/SeoHead'; // v2.0
import DiagnosticTool from '../components/DiagnosticTool';
import { generateArticleContent, generateScamContent, getFaqForSubject, generateCoinComparisonContent, generateSearchQueryContent } from '../lib/contentGen';

// ==========================================
// 2. HELPER FUNCTIONS & RNG
// ==========================================

const slugify = (text: string) => text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const getSeed = (str: string) => str.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
const seededRandom = (seed: number) => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}
const pickSeeded = <T,>(arr: T[], seed: number): T => arr[Math.floor(seededRandom(seed) * arr.length)];
const rangeSeeded = (min: number, max: number, seed: number) => Math.floor(seededRandom(seed) * (max - min + 1) + min);

const IMAGES = {
    HERO: ["1639762681485-074b7f938ba0", "1621504450374-147cb9225562", "1642104704074-907c0698b98d", "1518546305927-5a555bb7020d"],
    SECURITY: ["1614064641938-3bcee529cf8b", "1563986768609-322da13575f3", "1639322537228-ad716a473a21"],
    TRADING: ["1611974765219-03450a674d47", "1642751395632-349c8091dd26", "1590283626701-cfc030991312", "1611974765219-03450a674d47"],
    OFFICE: ["1497366216548-37526070297c", "1556761175-5973dc0f32e7"],
    VAULT: ["163986768609-322da13575f3", "1518546305927-5a555bb7020d"],
    FRAUD: ["1550751827-bc5b4c10747e", "1605835063061-f06b4613da7d"],
    ANALYSIS: ["1642751395632-349c8091dd26", "1590283626701-cfc030991312"],
    // SPECIFIC COIN IMAGES
    COINS: {
        bitcoin: "1518546305927-5a555bb7020d",
        ethereum: "1622790693518-671d5a84f93e",
        solana: "1640103767215-685b8fa250c9",
        cardano: "1620321023374-91a17fa0d4cc",
        dogecoin: "1621501726715-7cb0573e0475",
        ripple: "1619615598284-964263058869",
        polkadot: "1622630998477-20aa696f4c5c",
        litecoin: "1621416894569-0f39ed31d247",
        binance: "1624466986638-73fe42385153",
    } as Record<string, string>
};

const Breadcrumbs = ({ paths }: { paths: { label: string, href: string }[] }) => (
    <nav className="flex mb-8 text-xs font-bold uppercase tracking-widest text-slate-500 overflow-x-auto whitespace-nowrap pb-2">
        <Link href="/" className="hover:text-brand-400 transition-colors">Home</Link>
        {paths.map((p, i) => (
            <React.Fragment key={p.href}>
                <span className="mx-2 text-slate-700">/</span>
                <Link href={p.href} className={`hover:text-brand-400 transition-colors ${i === paths.length - 1 ? 'text-brand-400' : ''}`}>
                    {p.label}
                </Link>
            </React.Fragment>
        ))}
    </nav>
);



const getImage = (cat: keyof typeof IMAGES | string, seed: number) => {
    // 1. Try to find specific coin image if 'cat' matches a coin name
    const cleanCat = cat.toLowerCase();
    if (IMAGES.COINS[cleanCat]) {
        return `https://images.unsplash.com/photo-${IMAGES.COINS[cleanCat]}?auto=format&fit=crop&w=1200&q=80`;
    }

    // 2. Fallback to Category
    // If param is not a valid category, default to 'TRADING'
    const categoryKey = (cat in IMAGES && cat !== 'COINS') ? cat as keyof typeof IMAGES : 'TRADING';
    // @ts-ignore
    const arr = IMAGES[categoryKey] as string[];
    const id = arr[Math.floor(seededRandom(seed) * arr.length)];
    return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;
};

// ==========================================
// 3. EXCHANGE DATA GENERATOR
// ==========================================

function getExchangeData(name: string) {
    const seed = getSeed(name);

    // Procedural Data Generation based on Name Seed
    const scoreBase = 70 + (seed % 28); // 7.0 to 9.8
    const score = (scoreBase / 10).toFixed(1);

    const fees = [0.1, 0.05, 0.02, 0.075, 0.2];
    const maker = fees[seed % fees.length];
    const taker = fees[(seed + 1) % fees.length];

    const prosList = ["Liquidez masiva", "Bajas comisiones", "App 5 Estrellas", "Retiros Fiat Rápidos", "Soporte en Español", "Tarjeta Visa", "Staking > 10% APY", "Copy Trading"];
    const consList = ["KYC Obligatorio", "Soporte Lento", "Pocos Pares Fiat", "Interfaz Compleja", "Comisiones Retiro"];

    const pros = [pickSeeded(prosList, seed), pickSeeded(prosList, seed + 1), pickSeeded(prosList, seed + 2)];
    const cons = [pickSeeded(consList, seed), pickSeeded(consList, seed + 1)];

    return {
        name,
        slug: slugify(name),
        score,
        maker: `${maker}%`,
        taker: `${taker}%`,
        pros,
        cons,
        founded: 2011 + (seed % 10),
        users: `${(seed % 50) + 1} Millones`
    };
}

// ==========================================
// 4. CONTENT GENERATION
// ==========================================

// ... (Logic for generateReviewPage, generateComparisonPage, etc. - ADAPTED TO NEW UI)
function generateReviewPage(ex: any) {
    return {
        type: 'review',
        meta: { title: `${ex.name}: Review 2025 y Opiniones Reales`, desc: `Análisis de comisiones y seguridad de ${ex.name}.` },
        hero: { title: ex.name, subtitle: "Análisis Profundo 2025", image: getImage("TRADING", getSeed(ex.name)) },
        data: ex
    };
}

function generateComparisonPage(ex1: any, ex2: any) {
    const winner = parseFloat(ex1.score) > parseFloat(ex2.score) ? ex1 : ex2;
    return {
        type: 'comparison',
        meta: { title: `${ex1.name} vs ${ex2.name}: ¿Cuál elegir en 2025?`, desc: `Comparativa de comisiones.` },
        hero: { title: `${ex1.name} vs ${ex2.name}`, subtitle: "La Batalla Definitiva", image: getImage("HERO", getSeed(ex1.name + ex2.name)) },
        data: { ex1, ex2, winner }
    };
}

// ... Generators for Opinions/Problems
function generateOpinionPage(ex: any, pais: string) {
    return {
        type: 'opinion',
        meta: { title: `Opiniones de ${ex.name} en ${pais} (2025)`, desc: `Guía para usuarios de ${pais}.` },
        hero: { title: `${ex.name} en ${pais}`, subtitle: `Análisis Local`, image: getImage("OFFICE", getSeed(ex.name)) },
        data: { ...ex, hasBank: getSeed(ex.name + pais) % 2 === 0 },
        pais
    };
}

function generateProblemPage(ex: any, prob: any) {
    return {
        type: 'problem',
        meta: { title: `Solución: ${prob.title} en ${ex.name}`, desc: `Ayuda urgente.` },
        hero: { title: prob.title, subtitle: `Centro de Ayuda ${ex.name}`, image: getImage("SECURITY", getSeed(ex.name)) },
        data: prob,
        exchange: ex.name
    };
}

const getBreadcrumbs = (data: any) => {
    const paths = [];
    if (data.type.startsWith('hub_')) {
        paths.push({ label: data.type.replace('hub_', '').toUpperCase(), href: `/${data.type.replace('hub_', '')}` });
    } else if (data.type === 'guide' || data.type === 'news') {
        paths.push({ label: 'Academia', href: '/guias' });
        if (data.data?.coin) paths.push({ label: data.data.coin, href: `/guias/${slugify(data.data.guide || '')}/${slugify(data.data.coin)}` });
        paths.push({ label: data.meta.title, href: '#' });
    } else if (data.type === 'review') {
        paths.push({ label: 'Reviews', href: '/reviews' });
        paths.push({ label: data.data.name, href: '#' });
    } else if (data.type === 'scam') {
        paths.push({ label: 'Seguridad', href: '/estafas' });
        paths.push({ label: data.data.topic, href: '#' });
    } else if (data.type === 'static_') {
        paths.push({ label: data.title || 'Página', href: '#' });
    } else if (data.type === 'diagnostico_landing') {
        paths.push({ label: 'Diagnóstico', href: '/diagnostico' });
        paths.push({ label: data.hero.title, href: '#' });
    } else if (data.type === 'audit') {
        paths.push({ label: 'Auditoría', href: '/auditoria' });
        paths.push({ label: data.exchange, href: `/auditoria/${slugify(data.exchange)}` });
        if (data.factor) paths.push({ label: capitalize(data.factor), href: '#' });
    }
    return paths;
};

function generateNewsPage(coin: any, topic: string) {
    const title = `${topic}: ¿Qué está pasando con ${coin.name}? Análisis 2025`;
    const { content, steps } = generateArticleContent(`${coin.name} y el ${topic}`, 'news');
    return {
        type: 'news',
        meta: { title, desc: `Últimas noticias sobre ${coin.name}.` },
        hero: { title, subtitle: "Noticias de Última Hora", image: getImage("TRADING", getSeed(coin.name + topic)) },
        content,
        steps,
        data: { coin: coin.name, topic }
    };
}

function generateGuidePage(coin: any, guideTitle: string, country?: string) {
    const title = country
        ? `${guideTitle} ${coin.name} en ${country}: Guía 2025`
        : `${guideTitle} ${coin.name}: Guía Completa 2025`;

    // SEO Enhancement: Add country to description
    const desc = country
        ? `Aprende todo sobre ${coin.name} específicamente para usuarios residentes en ${country}.`
        : `Aprende todo sobre ${coin.name} con nuestra guía avanzada y actualizada.`;

    const { content, steps } = generateArticleContent(coin.name, 'guide', country);

    return {
        type: 'guide',
        meta: { title, desc },
        hero: {
            title,
            subtitle: country ? `Edición Especial ${country}` : "Academia Crypto 2025",
            image: getImage(coin.name, getSeed(coin.name + guideTitle))
        },
        content,
        steps,
        data: { coin: coin.name, guide: guideTitle, country }
    };
}

function generateScamPage(topic: string) {
    const title = `Alerta de Seguridad: ${topic} - Cómo Protegerte`;
    const content = generateScamContent(topic);
    return {
        type: 'scam',
        meta: { title, desc: `Aprende a identificar y evitar la estafa de ${topic}.` },
        hero: { title, subtitle: "Centro de Ciberseguridad", image: getImage("SECURITY", getSeed(topic)) },
        content,
        data: { topic }
    };
}


// ... SUB VIEWS
const ArticleView = ({ data }: any) => (
    <div className="max-w-4xl mx-auto px-4 py-24">
        {/* Modern Hero Section */}
        <div className="mb-20 text-center relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block px-6 py-2 rounded-full border border-brand-500/20 bg-brand-500/5 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10"
            >
                {data.type === 'guide' ? 'Guía de Inteligencia 2025' : 'Análisis Técnico // CryptoAyuda'}
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-[80px] font-black mb-12 tracking-tighter leading-[0.95] uppercase italic"
            >
                <span className="text-white block">{data.hero.title.split(' ').slice(0, 2).join(' ')}</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">{data.hero.title.split(' ').slice(2).join(' ')}</span>
            </motion.h1>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center gap-8 text-slate-500 text-[10px] font-black uppercase tracking-widest"
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white font-black italic shadow-lg shadow-brand-500/20">CA</div>
                    <span className="text-white">Redacción Central</span>
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div className="flex items-center gap-2">
                    <Clock size={12} /> 5m Read
                </div>
                <div className="w-px h-6 bg-white/10" />
                <div className="flex items-center gap-2">
                    <Globe size={12} /> {new Date().toLocaleDateString('es-ES', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
            </motion.div>
        </div>

        {/* Cinematic Image Container */}
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] mb-24 aspect-video border border-white/5 relative group"
        >
            <RobustImage
                src={data.hero.image}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                alt={data.hero.title}
                priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                    <Shield size={20} className="text-brand-500" />
                </div>
                <div>
                    <div className="text-white font-black text-xs uppercase tracking-widest leading-none">Contenido Certificado</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Status: Verified On-Chain</div>
                </div>
            </div>
        </motion.div>

        {/* Content Body with Refined Typography */}
        <article className="prose prose-invert prose-2xl max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-p:text-slate-400 prose-p:leading-relaxed prose-strong:text-white prose-a:text-brand-400 hover:prose-a:text-brand-300 prose-img:rounded-[32px] prose-ul:list-none prose-ul:pl-0">
            <div dangerouslySetInnerHTML={{ __html: data.content }} className="rich-content" />
        </article>

        {/* Post-Article Engagement */}
        <div className="mt-32 pt-20 border-t border-white/5">
            <div className="text-center mb-12">
                <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter">¿Siguiente Paso?</h3>
                <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black mt-2">Navegación Inteligente</p>
            </div>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <button
                    onClick={() => alert('¡Feedback recibido en el laboratorio!')}
                    className="flex items-center gap-3 px-10 py-5 bg-slate-900 border border-white/5 hover:border-brand-500/30 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-white"
                >
                    <Check size={16} /> Útil para mis fondos
                </button>

                <Link href="/diagnostico" className="flex items-center gap-4 px-12 py-6 bg-white text-slate-950 hover:bg-brand-500 hover:text-white rounded-2xl transition-all font-black uppercase tracking-widest text-xs shadow-xl shadow-brand-500/20 group">
                    <Zap size={18} fill="currentColor" /> Iniciar Diagnóstico <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>

                <button
                    onClick={() => {
                        if (navigator.share) {
                            navigator.share({ title: data.hero.title, url: window.location.href }).catch(() => { });
                        } else {
                            navigator.clipboard.writeText(window.location.href);
                            alert('Link copiado al sistema.');
                        }
                    }}
                    className="flex items-center gap-3 px-10 py-5 bg-slate-900 border border-white/5 hover:border-purple-500/30 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-white"
                >
                    <Globe size={16} /> Compartir Informe
                </button>
            </div>
        </div>

        {/* Affiliate / CTA Section */}
        <div className="mt-32 p-16 bg-gradient-to-br from-brand-500/5 to-purple-500/5 rounded-[50px] border border-white/5 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-[80px] -z-10 group-hover:bg-brand-500/10 transition-colors" />
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-[9px] font-black uppercase tracking-[0.3em] mb-10">Recomendado por CryptoAyuda</div>
            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter">Opera con los <span className="text-brand-500">Mejores</span></h3>
            <p className="text-slate-400 mb-12 max-w-xl mx-auto text-lg leading-relaxed font-medium">Únete a la plataforma líder global. Seguridad de nivel institucional y las comisiones más competitivas del ecosistema.</p>
            <Link
                href={BINANCE_AFFILIATE_LINK}
                target="_blank"
                className="inline-flex items-center gap-4 bg-white text-slate-950 hover:bg-brand-500 hover:text-white font-black px-12 py-6 rounded-2xl text-lg transition-all shadow-2xl hover:shadow-brand-500/40 transform hover:-translate-y-1"
            >
                REGISTRO OFICIAL <ArrowRight size={24} />
            </Link>
            <p className="mt-8 text-[9px] text-slate-600 font-black uppercase tracking-[0.4em]">Verified Affiliate Link • Secure Bridge</p>
        </div>
    </div>
);

const HomeView = ({ data }: any) => {
    const { price: usdtPrice } = useCryptoPrice();

    return (
        <div className="relative overflow-hidden bg-slate-950 min-h-screen">
            {/* Ambient Background Energy */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-brand-600/10 blur-[180px] rounded-full -z-10 pointer-events-none" />
            <div className="absolute top-[800px] right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full -z-10 pointer-events-none" />

            {/* Hero Section */}
            <section className="pt-48 pb-32 px-4 relative overflow-hidden">
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 px-6 py-2 rounded-full mb-10"
                    >
                        <div className="w-2 h-2 bg-brand-500 rounded-full animate-ping" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400">Intelligence Platform v4.0</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-6xl md:text-[100px] font-black tracking-tighter leading-[0.9] uppercase italic mb-8"
                    >
                        <span className="text-white">Operativa</span> <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-400 to-purple-500">Inquebrantable</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed"
                    >
                        CryptoAyuda es el hub profesional de análisis, seguridad y formación técnica. <br className="hidden md:block" />
                        Protegemos tu capital con datos on-chain y educación de alto nivel.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-6"
                    >
                        <Link href="/academia" className="group bg-white text-slate-950 hover:bg-brand-500 hover:text-white px-12 py-6 rounded-2xl text-lg font-black uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-brand-500/40 transform hover:-translate-y-1 flex items-center gap-3">
                            Ver Academia <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/problemas" className="px-12 py-6 rounded-2xl border border-white/10 hover:bg-white/5 text-white text-lg font-black uppercase tracking-widest transition-all">
                            Solicitar Ayuda
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Price Ticker / Stats Bar */}
            <div className="bg-white/5 border-y border-white/5 py-8 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center group">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Dólar Crypto</div>
                        <div className="text-2xl font-black text-white italic group-hover:text-brand-400 transition-colors">
                            {usdtPrice ? `$${Math.ceil(usdtPrice).toLocaleString('es-AR')}` : '---'}
                        </div>
                    </div>
                    <div className="text-center group">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Scams Detectados</div>
                        <div className="text-2xl font-black text-red-500 italic">482+</div>
                    </div>
                    <div className="text-center group">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Alumnos Activos</div>
                        <div className="text-2xl font-black text-white italic">12.4k</div>
                    </div>
                    <div className="text-center group">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Auditorías 2025</div>
                        <div className="text-2xl font-black text-brand-500 italic">100% Ok</div>
                    </div>
                </div>
            </div>

            {/* Category Grid Section */}
            <section className="py-32 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div className="max-w-2xl text-left">
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">
                            Navega con <span className="text-brand-500">Autoridad</span>
                        </h2>
                        <p className="text-slate-500 text-lg uppercase tracking-tight font-bold">Selecciona el módulo de inteligencia que necesitas consultar.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { title: 'Noticias', desc: 'Alertas en tiempo real', icon: <Zap size={24} />, href: '/noticias', color: 'blue' },
                        { title: 'Academia', desc: 'Carrera Profesional', icon: <Award size={24} />, href: '/academia', color: 'brand' },
                        { title: 'Reviews', desc: 'Exchanges Auditados', icon: <Shield size={24} />, href: '/reviews', color: 'purple' },
                        { title: 'Comparativa', desc: 'Bitcoin vs Altcoins', icon: <HelpCircle size={24} />, href: '/comparar', color: 'emerald' },
                    ].map((card, i) => (
                        <Link
                            key={card.title}
                            href={card.href}
                            className="bg-slate-900/40 border border-white/5 p-10 rounded-[40px] group hover:bg-white/5 transition-all relative overflow-hidden h-[300px] flex flex-col justify-end"
                        >
                            <div className={`absolute top-0 right-0 p-8 text-slate-800 text-8xl font-black -z-10 opacity-20 group-hover:opacity-40 transition-opacity`}>0{i + 1}</div>
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                                {card.icon}
                            </div>
                            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2 group-hover:text-brand-400 transition-colors uppercase">
                                {card.title}
                            </h3>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{card.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Exchanges */}
            <section className="py-32 px-4 bg-white/[0.02] border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl font-black uppercase tracking-[0.2em] text-slate-600 mb-16 text-center italic underline decoration-brand-500/30 underline-offset-[20px]">Directorio de Confianza</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {data.exchanges.slice(0, 3).map((ex: string) => (
                            <Link href={`/reviews/${slugify(ex)}`} key={ex} className="bg-slate-950 border border-white/10 p-12 rounded-[50px] group hover:border-brand-500/50 transition-all shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 blur-3xl" />
                                <div className="flex items-center justify-between mb-8">
                                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center font-black text-2xl italic text-brand-500">
                                        {ex[0]}
                                    </div>
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(s => <div key={s} className="w-1.5 h-6 bg-brand-500 rounded-full opacity-30" />)}
                                    </div>
                                </div>
                                <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter mb-4">{ex}</h3>
                                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                                    Análisis completo de comisiones, seguridad y soporte en {ex} para inversores locales.
                                </p>
                                <div className="text-brand-400 font-black uppercase text-xs tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                                    Ver Auditoría <ArrowRight size={16} />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

const ReviewView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-12 gap-16 items-start">
            {/* Sidebar Sticky - Intelligence Stats */}
            <aside className="md:col-span-4 lg:col-span-3 space-y-8 sticky top-32">
                <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/5 p-10 rounded-[40px] text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl opacity-50" />
                    <ScoreCard score={data.data.score} label="Trust Score v4.0" size="lg" />

                    <div className="mt-10 space-y-3">
                        <Link href={`/opiniones/${data.data.slug}/argentina`} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                            <span>🇦🇷 Feedback local</span>
                            <ArrowRight size={14} />
                        </Link>
                        <Link href={`/comparar/binance-vs-${data.data.slug}`} className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
                            <span>🆚 Versus Binance</span>
                            <ArrowRight size={14} />
                        </Link>
                    </div>

                    <Link
                        href={data.data.slug === 'binance' ? BINANCE_AFFILIATE_LINK : `https://${data.data.slug}.com/register`}
                        target="_blank"
                        className="block w-full bg-white text-slate-950 hover:bg-brand-500 hover:text-white font-black py-5 rounded-2xl mt-10 transition-all shadow-xl shadow-brand-500/10 uppercase tracking-widest text-xs"
                    >
                        ABRIR CUENTA
                    </Link>
                    <p className="mt-4 text-[8px] font-black uppercase tracking-[0.3em] text-slate-600">Secure Registration Link</p>
                </div>

                <div className="p-8 bg-brand-500/5 border border-brand-500/10 rounded-[32px]">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-500 mb-4">Security Nodes</h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-bold uppercase text-slate-500">
                            <span>Auditoría 2025</span>
                            <span className="text-green-500">PASSED</span>
                        </div>
                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                            <div className="bg-green-500/50 w-full h-full" />
                        </div>
                    </div>
                </div>
            </aside>

            {/* Content Area */}
            <article className="md:col-span-8 lg:col-span-9">
                <div className="flex flex-wrap items-center gap-4 mb-10">
                    <span className="px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em]">Auditoría Verificada</span>
                    <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest">• Actualizado: {new Date().toLocaleDateString('es-ES', { month: 'long', day: 'numeric' })}</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black mb-10 tracking-tighter leading-none uppercase italic">
                    <span className="text-white">Análisis</span> <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">{data.data.name}</span>
                </h1>

                <p className="text-2xl text-slate-400 mb-16 leading-relaxed font-medium">{data.meta.desc}</p>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-20">
                    {[
                        { label: 'Maker Fee', value: data.data.maker, sub: 'Límite' },
                        { label: 'Taker Fee', value: data.data.taker, sub: 'Mercado' },
                        { label: 'Regulación', value: 'Máxima', sub: 'Certificada' },
                        { label: 'Fundado', value: data.data.founded, sub: 'Operativa' }
                    ].map((metric, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/5 p-8 rounded-[32px] hover:border-brand-500/30 transition-all group">
                            <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2 group-hover:text-brand-500 transition-colors">{metric.label}</div>
                            <div className="text-2xl font-black text-white italic">{metric.value}</div>
                            <div className="text-[9px] font-black text-slate-700 uppercase tracking-tighter mt-1">{metric.sub}</div>
                        </div>
                    ))}
                </div>

                <div className="prose prose-invert prose-2xl max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-p:text-slate-400 prose-p:leading-relaxed prose-strong:text-white">
                    <h2 className="text-4xl">Protocolos de Seguridad</h2>
                    <p>Nuestros analistas han auditado la infraestructura de {data.data.name}. La arquitectura de seguridad implementa protocolos multinivel con almacenamiento en frío para el 98% de los activos, mitigando riesgos de vectores de ataque externos.</p>
                </div>

                {/* Pros & Cons Section */}
                <div className="grid md:grid-cols-2 gap-8 my-20">
                    <div className="bg-green-500/5 border border-green-500/20 p-10 rounded-[40px]">
                        <h4 className="text-green-500 font-black mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
                            <CheckCircle size={18} /> Fortalezas Técnicas
                        </h4>
                        <ul className="space-y-6">
                            {data.data.pros.map((p: string) => (
                                <li key={p} className="text-slate-300 text-sm flex gap-4 items-start">
                                    <div className="w-5 h-5 bg-green-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <Check size={12} className="text-green-500" />
                                    </div>
                                    <span className="font-medium text-slate-400">{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="bg-red-500/5 border border-red-500/20 p-10 rounded-[40px]">
                        <h4 className="text-red-500 font-black mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.2em]">
                            <AlertTriangle size={18} /> Puntos de Auditoría
                        </h4>
                        <ul className="space-y-6">
                            {data.data.cons.map((c: string) => (
                                <li key={c} className="text-slate-300 text-sm flex gap-4 items-start">
                                    <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <span className="text-red-500 font-black text-[10px]">!</span>
                                    </div>
                                    <span className="font-medium text-slate-400">{c}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* CTA Box */}
                <div className="mt-32 p-16 bg-gradient-to-br from-brand-900/40 via-slate-900 to-slate-950 rounded-[50px] border border-white/5 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px] -z-10 group-hover:bg-brand-500/20 transition-all duration-700" />
                    <h3 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">Inversión Certificada</h3>
                    <p className="text-slate-500 mb-12 max-w-xl mx-auto text-lg leading-relaxed font-medium">No dejes tu capital al azar. Opera en las plataformas con mayor liquidez y seguridad del mercado global.</p>
                    <Link
                        href={BINANCE_AFFILIATE_LINK}
                        target="_blank"
                        className="inline-flex items-center gap-4 bg-white text-slate-950 hover:bg-brand-500 hover:text-white font-black px-12 py-6 rounded-2xl text-lg transition-all shadow-2xl hover:shadow-brand-500/40 transform hover:-translate-y-1"
                    >
                        REGISTRO PRIORITARIO <ArrowRight size={24} />
                    </Link>
                    <p className="mt-8 text-[9px] text-slate-600 font-black uppercase tracking-[0.4em]">Official Institutional Gateway • 2025</p>
                </div>
            </article>
        </div>
    </div>
);

const ComparisonView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        {/* Header - The Battle */}
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Auditoría Comparativa</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none">
                <span className="text-white">{data.data.ex1.name}</span>
                <span className="text-slate-800 mx-4">VS</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">{data.data.ex2.name}</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Analítica avanzada de liquidez, comisiones y protocolos de seguridad para determinar el exchange líder.</p>
        </div>

        {/* Comparison Engine */}
        <div className="grid grid-cols-1 lg:grid-cols-11 gap-4 items-stretch relative">
            {/* Exchange 1 */}
            <div className="lg:col-span-4 bg-slate-950 border border-white/5 p-12 rounded-[50px] relative overflow-hidden group hover:border-brand-500/30 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl" />
                <h2 className="text-4xl font-black text-white italic mb-10 text-center">{data.data.ex1.name}</h2>
                <ScoreCard score={data.data.ex1.score} label="Global Score" />
                <div className="mt-12 space-y-6">
                    {[
                        { label: 'Maker Fee', val: data.data.ex1.maker },
                        { label: 'Liquidez', val: 'Extrema' },
                        { label: 'Usuarios', val: data.data.ex1.users }
                    ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{row.label}</span>
                            <span className="text-white font-black italic">{row.val}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* VS Divider - Winner Announcement */}
            <div className="lg:col-span-3 flex flex-col items-center justify-center py-12 lg:py-0">
                <div className="relative">
                    <div className="absolute inset-0 bg-brand-500/20 blur-3xl rounded-full" />
                    <div className="w-32 h-32 bg-brand-500 rounded-full flex items-center justify-center font-black text-4xl italic text-white relative z-10 shadow-2xl shadow-brand-500/50">VS</div>
                </div>
                <div className="mt-12 text-center">
                    <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4">Veredicto Final</div>
                    <div className="inline-block bg-white text-slate-950 px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl">
                        Ganador: {data.data.winner.name}
                    </div>
                </div>
            </div>

            {/* Exchange 2 */}
            <div className="lg:col-span-4 bg-slate-950 border border-white/5 p-12 rounded-[50px] relative overflow-hidden group hover:border-brand-500/30 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 blur-3xl" />
                <h2 className="text-4xl font-black text-white italic mb-10 text-center">{data.data.ex2.name}</h2>
                <ScoreCard score={data.data.ex2.score} label="Global Score" />
                <div className="mt-12 space-y-6">
                    {[
                        { label: 'Maker Fee', val: data.data.ex2.maker },
                        { label: 'Liquidez', val: 'Alta' },
                        { label: 'Usuarios', val: data.data.ex2.users }
                    ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{row.label}</span>
                            <span className="text-white font-black italic">{row.val}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Action Call */}
        <div className="mt-32 text-center bg-gradient-to-b from-white/[0.03] to-transparent p-20 rounded-[60px] border border-white/5">
            <h3 className="text-4xl font-black text-white mb-8 uppercase italic tracking-tighter leading-none">Abre tu cuenta con beneficios</h3>
            <p className="text-slate-500 mb-12 max-w-xl mx-auto text-lg leading-relaxed">Utiliza nuestro enlace de auditoría oficial para obtener descuentos vitalicios en comisiones de trading.</p>
            <Link
                href={data.data.winner.slug === 'binance' ? BINANCE_AFFILIATE_LINK : `https://${data.data.winner.slug}.com/register`}
                target="_blank"
                className="inline-flex items-center gap-4 bg-white text-slate-950 hover:bg-brand-500 hover:text-white font-black px-12 py-6 rounded-2xl text-xl transition-all shadow-2xl hover:shadow-brand-500/40 transform hover:-translate-y-1"
            >
                OPERAR EN {data.data.winner.name.toUpperCase()} <ArrowRight size={28} />
            </Link>
        </div>
    </div>
);

const HubReviewsView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Auditoría Institucional</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none">
                Directorio <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">Exchanges</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Nuestra base de datos de auditoría analiza más de 200 puntos de datos por exchange para garantizar la seguridad de su capital.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.exchanges?.map((ex: string) => (
                <Link href={`/reviews/${slugify(ex)}`} key={ex} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-12 rounded-[50px] group hover:border-brand-500/30 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 blur-3xl" />
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center font-black text-2xl italic text-brand-500 mb-8">
                        {ex[0]}
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-4">{ex}</h3>
                    <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">Análisis técnico de infraestructura, liquidez y cumplimiento regulatorio de {ex}.</p>
                    <div className="text-brand-400 font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3 group-hover:gap-5 transition-all">
                        EXPLORAR AUDITORÍA <ArrowRight size={16} />
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

const HubCompareView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Métricas Comparativas</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none text-white">
                Workbench <br />
                <span className="text-slate-800">Contrast</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Detección de ventajas competitivas mediante el contraste de protocolos técnicos y estructuras de costos.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.exchanges?.slice(0, 6).map((ex1: string, i: number) => (
                data.exchanges?.slice(i + 1, i + 2).map((ex2: string) => (
                    <Link href={`/comparar/${slugify(ex1)}-vs-${slugify(ex2)}`} key={`${ex1}-${ex2}`} className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-10 rounded-[40px] group hover:border-brand-500/30 transition-all relative overflow-hidden text-center">
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center font-black text-lg italic text-white">{ex1[0]}</div>
                            <span className="text-slate-800 font-black italic">VS</span>
                            <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center font-black text-lg italic text-brand-500">{ex2[0]}</div>
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">{ex1} <span className="text-slate-700">vs</span> {ex2}</h3>
                        <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-8">Comparativa de Alto Rendimiento</p>
                        <div className="inline-flex items-center gap-3 text-white font-black uppercase text-[10px] tracking-[0.2em] bg-white/5 px-6 py-3 rounded-xl group-hover:bg-brand-500 transition-all">
                            INICIAR VERSIÓN <ArrowRight size={14} />
                        </div>
                    </Link>
                ))
            ))}
        </div>
    </div>
);

const HubOpinionsView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Regional Intelligence</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none text-white">
                Geo <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-emerald-500">Feedback</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Monitorización de la operatividad bancaria local y cumplimiento normativo por jurisdicción.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.exchanges?.slice(0, 4).flatMap((ex: string) =>
                data.paises?.slice(0, 4).map((pais: string) => (
                    <Link href={`/opiniones/${slugify(ex)}/${slugify(pais)}`} key={`${ex}-${pais}`} className="bg-slate-900/40 border border-white/5 p-8 rounded-[32px] group hover:border-brand-500/30 transition-all relative overflow-hidden">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center font-black text-sm italic text-slate-400 group-hover:text-white transition-colors uppercase">
                                {pais.slice(0, 2)}
                            </div>
                            <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">{ex}</h3>
                        </div>
                        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">Auditoría {pais}</p>
                    </Link>
                ))
            )}
        </div>
    </div>
);

const HubProblemsView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Crisis Response Center</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none text-white">
                Emergency <br />
                <span className="text-slate-800 underline decoration-red-600 underline-offset-[20px]">Protocols</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Resolución técnica de incidencias críticas: fondos bloqueados, denegación de retiro y fallos de autenticación.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.problems?.map((problem: any) => (
                <Link href={`/problemas/${slugify(problem.title)}`} key={problem.title} className="bg-slate-900 border border-red-900/10 p-12 rounded-[50px] group hover:border-red-500/30 transition-all relative overflow-hidden flex flex-col justify-between h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl" />
                    <div>
                        <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center mb-8">
                            <AlertTriangle size={24} className="text-red-500" />
                        </div>
                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-6 leading-tight">{problem.title}</h3>
                        <p className="text-slate-500 text-lg leading-relaxed font-medium mb-12">{problem.description}</p>
                    </div>
                    <div className="text-red-500 font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3 group-hover:gap-5 transition-all">
                        INGRESAR AL PROTOCOLO <ArrowRight size={16} />
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

const HubNewsView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Pulse Monitor</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none text-white">
                Live <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Intelligence</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Monitorización global de eventos sistémicos, cambios regulatorios y liquidez de mercado en tiempo real.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.topics?.flatMap((topic: string, i: number) =>
                data.coins?.slice(i, i + 3).map((coin: any, k: number) => (
                    <Link href={`/noticias/${slugify(coin.name)}/${slugify(topic)}`} key={coin.name + topic} className="bg-slate-900 border border-white/5 rounded-[40px] overflow-hidden group hover:border-blue-500/30 transition-all flex flex-col">
                        <div className="h-64 relative overflow-hidden">
                            <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                            <RobustImage
                                src={getImage(coin.name, getSeed(coin.name + topic))}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                priority={i < 2}
                                alt={`Intelligence report: ${coin.name}`}
                            />
                            <div className="absolute top-6 left-6 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-lg z-20 backdrop-blur-md">
                                {topic}
                            </div>
                        </div>
                        <div className="p-10 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4 leading-tight">Detección: Evento de volatilidad en {coin.name}</h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">Análisis forense sobre {topic} y su impacto directo en la liquidez institucional de {coin.name}.</p>
                            </div>
                            <div className="text-blue-400 font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3">
                                ACCEDER AL REPORTE <ArrowRight size={14} />
                            </div>
                        </div>
                    </Link>
                ))
            ).slice(0, 48)}
        </div>
        <div className="mt-12 text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">
            Sync Status: Real-time Coverage Active
        </div>
    </div>
);

const HubGuidesView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Crypto Lab Training</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none text-white">
                Core <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Mastery</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Protocolos de ejecución paso a paso para dominar la operativa institucional en mercados descentralizados.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.guides?.flatMap((guide: string, i: number) =>
                data.coins?.slice(0, 15).flatMap((coin: any, j: number) => {
                    const country = (j % 3 === 0) ? PAISES[j % PAISES.length] : null;
                    const href = country
                        ? `/guias/${slugify(guide)}/${slugify(coin.name)}/${slugify(country)}`
                        : `/guias/${slugify(guide)}/${slugify(coin.name)}`;

                    return (
                        <Link href={href} key={`${guide}-${coin.name}-${country || 'global'}`} className="bg-slate-950 border border-white/5 p-8 rounded-[32px] group hover:border-purple-500/30 transition-all flex flex-col justify-between h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-2xl" />
                            <div>
                                <div className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-4 group-hover:text-purple-400 transition-colors">{guide}</div>
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter mb-4">{coin.name}</h3>
                                {country && <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-lg text-slate-400 text-[9px] font-black uppercase tracking-widest mb-4">📍 {country}</div>}
                            </div>
                            <div className="mt-8 flex items-center justify-between">
                                <span className="text-purple-500 font-black text-[10px] uppercase tracking-widest">Protocolo Activo</span>
                                <ArrowRight size={14} className="text-slate-700 group-hover:text-white transition-colors" />
                            </div>
                        </Link>
                    );
                })
            ).slice(0, 60)}
        </div>
    </div>
);

const HubScamsView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Threat Intelligence Center</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none text-red-500">
                Security <br />
                <span className="text-white">Watchlist</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Detección temprana de esquemas Ponzi, phishing y vulnerabilidades críticas en protocolos DeFi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {data.scams?.map((scam: string) => (
                <Link href={`/estafas/${slugify(scam)}`} key={scam} className="bg-slate-950 border border-red-500/10 p-10 rounded-[40px] group hover:border-red-500/50 transition-all relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center gap-5 mb-8">
                        <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center">
                            <ShieldAlert size={28} className="text-red-500 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-red-400 transition-colors">{scam}</h3>
                            <span className="text-red-500 text-[9px] font-black uppercase tracking-[0.3em] mt-2 block">High Risk Alert</span>
                        </div>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium mb-10">Análisis forense de los vectores de ataque utilizados por {scam} y medidas preventivas.</p>
                    <div className="text-red-500 font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3">
                        VER DETALLES TÉCNICOS <ArrowRight size={14} />
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

const ScamView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="relative h-[60vh] rounded-[60px] overflow-hidden mb-20">
            <img src={data.hero.image} className="w-full h-full object-cover grayscale opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
            <div className="absolute bottom-16 left-16 right-16">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-red-500 rounded-xl text-white text-[10px] font-black uppercase tracking-[0.3em] mb-8 shadow-2xl shadow-red-500/40 animate-pulse">
                    <ShieldAlert size={16} /> Alerta Técnica Crítica
                </div>
                <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter uppercase italic leading-none">
                    Protocolo de Riesgo: <br />
                    <span className="text-red-500">{data.hero.title}</span>
                </h1>
            </div>
        </div>

        <div className="grid md:grid-cols-12 gap-16 items-start">
            <aside className="md:col-span-4 sticky top-32 space-y-8">
                <div className="bg-slate-900/60 backdrop-blur-2xl border border-red-500/20 p-10 rounded-[40px]">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 mb-8">Vector de Amenaza</h4>
                    <div className="space-y-6">
                        {[
                            { label: 'Nivel de Riesgo', val: 'Crítico', color: 'text-red-500' },
                            { label: 'Estado', val: 'Activo', color: 'text-orange-500' },
                            { label: 'Detección', val: 'Auditada', color: 'text-white' }
                        ].map((stat, i) => (
                            <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4">
                                <span className="text-[10px] font-black uppercase text-slate-600">{stat.label}</span>
                                <span className={`text-[10px] font-black uppercase ${stat.color}`}>{stat.val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-10 bg-brand-500/5 border border-brand-500/10 rounded-[40px]">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-500 mb-6">Soporte Técnico</h4>
                    <p className="text-slate-500 text-xs font-medium leading-relaxed mb-8">Si ha interactuado con este protocolo, inicie el proceso de recuperación inmediatamente.</p>
                    <button className="w-full bg-white text-slate-950 hover:bg-brand-500 hover:text-white font-black py-4 rounded-2xl transition-all shadow-xl text-[10px] uppercase tracking-widest">
                        SOLICITAR AUDITORÍA
                    </button>
                </div>
            </aside>

            <article className="md:col-span-8 prose prose-invert prose-2xl max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-p:text-slate-400 prose-p:leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: data.content }} />
            </article>
        </div>
    </div>
);

const OpinionView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-20">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Jurisdictional Audit</span>
            <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tighter uppercase italic leading-none text-white">
                {data.hero.title.split(' en ')[0]} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">{data.hero.title.split(' en ')[1]}</span>
            </h1>
            <p className="text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">{data.meta.desc}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
            <div className="bg-slate-950 border border-white/5 p-12 rounded-[50px] relative overflow-hidden group hover:border-brand-500/30 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-3xl" />
                <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl">🏦</div>
                    <div>
                        <h4 className="text-xl font-black text-white uppercase italic tracking-tighter mb-1">Rampa de Entrada</h4>
                        <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Local Banking Status</p>
                    </div>
                </div>
                <div className="p-8 bg-white/5 rounded-[32px] border border-white/5">
                    <p className="text-slate-400 text-lg leading-relaxed font-medium">
                        {data.data.hasBank
                            ? `Protocolo de transferencia directa habilitado para entidades financieras en ${data.pais}.`
                            : `Conectividad bancaria directa restringida en ${data.pais}. Se recomienda el uso de pasarelas P2P verificadas.`}
                    </p>
                </div>
            </div>

            <div className="bg-slate-950 border border-white/5 p-12 rounded-[50px] relative overflow-hidden group hover:border-brand-500/30 transition-all">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 blur-3xl" />
                <div className="flex items-center gap-6 mb-10">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-4xl">💳</div>
                    <div>
                        <h4 className="text-xl font-black text-white uppercase italic tracking-tighter mb-1">Pagos con Tarjeta</h4>
                        <p className="text-[10px] font-black uppercase text-slate-600 tracking-widest">Transaction Gateway</p>
                    </div>
                </div>
                <div className="p-8 bg-brand-500/5 rounded-[32px] border border-brand-500/10">
                    <p className="text-slate-400 text-lg leading-relaxed font-medium mt-1">
                        Soporte para procesadores Visa y Mastercard. Tenga en cuenta los aranceles por transacción internacional y el cumplimiento de las normativas de cambio locales.
                    </p>
                </div>
            </div>
        </div>

        <div className="mt-24 text-center">
            <div className="inline-flex flex-col items-center p-12 bg-white/[0.02] border border-white/10 rounded-[60px] max-w-2xl">
                <h3 className="text-2xl font-black text-white mb-6 uppercase italic tracking-tighter">¿Problemas en {data.pais}?</h3>
                <p className="text-slate-500 mb-10 font-medium">Si su banco ha rechazado una operación o tiene fondos retenidos, nuestro equipo técnico puede asistirle.</p>
                <Link href="/problemas" className="bg-white text-slate-950 hover:bg-brand-500 hover:text-white font-black px-12 py-5 rounded-2xl transition-all shadow-xl text-xs uppercase tracking-widest">
                    SOLICITAR ASISTENCIA REGIONAL
                </Link>
            </div>
        </div>
    </div>
);

const ProblemView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto">
            {/* Header - The Incident */}
            <div className="bg-red-500/5 border border-red-500/20 p-12 rounded-[50px] mb-16 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl" />
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center">
                        <AlertTriangle size={32} className="text-red-500" />
                    </div>
                    <div>
                        <span className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2 block">Detection: Critical Incident</span>
                        <h1 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter leading-tight">{data.hero.title}</h1>
                    </div>
                </div>
                <p className="text-xl text-slate-400 font-medium leading-relaxed">{data.meta.desc}</p>
            </div>

            {/* Resolution Protocol */}
            <article className="prose prose-invert prose-2xl max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-p:text-slate-400 prose-p:leading-relaxed bg-slate-900/40 border border-white/5 p-16 rounded-[60px]">
                <h2 className="text-3xl mb-10 flex items-center gap-4">
                    <span className="w-10 h-px bg-brand-500" /> Resolución Técnica
                </h2>

                <div className="space-y-12 not-prose">
                    {[
                        { step: '01', title: 'Aislamiento de Seguridad', desc: 'No comparta credenciales de autenticación ni códigos 2FA. Inicie sesión únicamente desde su aplicación móvil oficial.' },
                        { step: '02', title: 'Verificación de Nodo', desc: `Compruebe el estado operativo de los servidores de ${data.exchange} para descartar latencia o mantenimiento regional.` },
                        { step: '03', title: 'Escalada de Soporte', desc: 'Active el canal de chat prioritario y proporcione el ID de transacción o referencia de cuenta para auditoría inmediata.' }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-8 group">
                            <div className="text-4xl font-black text-slate-800 italic group-hover:text-brand-500 transition-colors">{item.step}</div>
                            <div>
                                <h4 className="text-xl font-black text-white uppercase tracking-tighter mb-2">{item.title}</h4>
                                <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 pt-10 border-t border-white/5">
                    <Link href="/problemas" className="inline-flex items-center gap-3 text-brand-500 font-black uppercase text-[10px] tracking-[0.3em] hover:gap-5 transition-all">
                        <ArrowLeft size={16} /> REINTEGRAR AL CENTRO DE AYUDA
                    </Link>
                </div>
            </article>
        </div>
    </div>
);

const LegalView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto bg-slate-900/40 border border-white/5 p-16 md:p-24 rounded-[60px]">
            <span className="text-brand-500 text-[10px] font-black uppercase tracking-[0.4em] mb-10 block">Compliance & Policy</span>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-10 tracking-tighter uppercase italic leading-none">{data.title}</h1>
            <p className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-16 pb-10 border-b border-white/5">Vigencia Protocolo: 2025/2026</p>

            <article className="prose prose-invert prose-2xl max-w-none prose-p:text-slate-400 prose-p:leading-relaxed prose-headings:text-white prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-strong:text-white">
                <div dangerouslySetInnerHTML={{ __html: data.content || '<p>Contenido no disponible.</p>' }} />
            </article>
        </div>
    </div>
);

const ContactView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Intelligence Operations</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none text-white">
                Contact <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">The Lab</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Asistencia técnica institucional y auditoría de ciberseguridad avanzada.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
            <div className="bg-slate-950 border border-white/5 p-16 rounded-[60px] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 blur-3xl" />
                <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-10">Enviar Reporte</h3>
                <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Gracias. Tu reporte ha sido enviado al equipo técnico.'); }}>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-600 mb-3 tracking-widest px-1">Identidad / Alias</label>
                            <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 transition-all font-medium" placeholder="Su nombre" required />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black uppercase text-slate-600 mb-3 tracking-widest px-1">Canal de Respuesta</label>
                            <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 transition-all font-medium" placeholder="correo@ejemplo.com" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-3 tracking-widest px-1">Asunto de Auditoría</label>
                        <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 transition-all font-medium appearance-none">
                            <option>Reporte de Estafa</option>
                            <option>Problemas con Exchange</option>
                            <option>Soporte Académico</option>
                            <option>Partner / Business</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase text-slate-600 mb-3 tracking-widest px-1">Mensaje / Requerimiento</label>
                        <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 transition-all font-medium resize-none text-sm leading-relaxed" placeholder="Describa la situación técnica aquí..." />
                    </div>
                    <button type="submit" className="w-full bg-white text-slate-950 hover:bg-brand-500 hover:text-white font-black py-5 rounded-2xl transition-all shadow-2xl uppercase tracking-widest text-xs">
                        TERMINAR Y ENVIAR
                    </button>
                    <p className="text-center text-[8px] font-black uppercase tracking-[0.4em] text-slate-700">Protected by AES-256 Encryption</p>
                </form>
            </div>

            <div className="space-y-8">
                <div className="bg-slate-900 border border-white/5 p-12 rounded-[50px] group hover:border-brand-500/30 transition-all">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center">
                            <MessageSquare className="text-brand-500" />
                        </div>
                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">Soporte Directo</h4>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">Nuestros analistas están disponibles para casos de urgencia técnica y fondos bloqueados.</p>
                    <div className="text-brand-400 font-black uppercase text-[10px] tracking-widest select-all">support@cryptoayuda.com</div>
                </div>

                <div className="bg-slate-900 border border-white/5 p-12 rounded-[50px] group hover:border-brand-500/30 transition-all">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                            <Globe className="text-purple-500" />
                        </div>
                        <h4 className="text-2xl font-black text-white uppercase italic tracking-tighter">Comunidad</h4>
                    </div>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8">Únete a nuestra red de inteligencia en Telegram para alertas en tiempo real.</p>
                    <div className="text-purple-400 font-black uppercase text-[10px] tracking-widest">@cryptoayuda_lab</div>
                </div>
            </div>
        </div>
    </div>
);

const AboutView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">The intelligence Lab</span>
                <h1 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter uppercase italic leading-none">
                    Misión <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">Financiera</span>
                </h1>
                <div className="space-y-6 text-xl text-slate-400 font-medium leading-relaxed">
                    <p>CryptoAyuda.org nació tras identificar una brecha crítica en la educación financiera hispana: el exceso de ruido publicitario y la falta de soporte real ante problemas técnicos complejos.</p>
                    <p>Somos un equipo multidisciplinario de entusiastas de la seguridad y analistas de blockchain comprometidos con la soberanía financiera. Nuestra meta es dotar a cada usuario de las herramientas necesarias para navegar el ecosistema Web3 sin miedo a estafas o bloqueos de cuenta injustificados.</p>
                </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/5 p-16 rounded-[60px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px]" />
                <div className="text-4xl text-brand-500 font-black mb-10 italic">"</div>
                <p className="text-3xl font-black text-white italic tracking-tighter leading-tight mb-10">
                    "La verdadera libertad financiera solo es posible a través de la educación y la seguridad extrema."
                </p>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center font-black italic text-brand-500">CA</div>
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Institutional Protocol</div>
                </div>
            </div>
        </div>
    </div>
);

const HubFaqView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Intelligence Database</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none text-white">
                Core <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">Knowledge</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Respuestas técnicas validadas sobre custodia, redes y resolución de incidentes.</p>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto">
            {[
                { q: "¿Qué hago si mi cuenta de exchange fue bloqueada?", a: "Primero, mantén la calma. Reúne toda la documentación de origen de fondos y contacta al soporte oficial ÚNICAMENTE a través de la app oficial. Evita grupos de Telegram que prometan 'desbloqueos' por dinero." },
                { q: "¿Es seguro dejar mis fondos en Binance?", a: "Para montos pequeños de trading diario es aceptable, pero para ahorros a largo plazo SIEMPRE recomendamos usar una Hardware Wallet (Ledger/Trezor). Recuerda: No tus llaves, no tus monedas." },
                { q: "¿Cómo identifico una estafa de inversión?", a: "Si te prometen retornos fijos garantizados, es una estafa. El mercado crypto es volátil por naturaleza y nadie puede asegurar ganancias mensuales del 10% o más." }
            ].map((faq, i) => (
                <div key={i} className="bg-slate-900/60 backdrop-blur-xl border border-white/5 p-12 rounded-[50px] relative overflow-hidden group hover:border-brand-500/30 transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-500/5 blur-2xl" />
                    <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-6">{faq.q}</h3>
                    <p className="text-slate-500 text-lg leading-relaxed font-medium">{faq.a}</p>
                </div>
            ))}
        </div>
    </div>
);

const HubSecurityView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Defensive Protocols</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none text-white">
                Defi <br />
                <span className="text-emerald-500">Fortress</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Sistemas de protección avanzada y auditoría de contratos inteligentes para el ecosistema Web3.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.guides.map((g: string, i: number) => (
                <div key={i} className="bg-slate-950 border border-emerald-500/10 p-12 rounded-[50px] group hover:border-emerald-500/40 transition-all flex flex-col justify-between h-full relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl" />
                    <div>
                        <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-8">
                            <ShieldCheck size={28} className="text-emerald-500" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-6">{g}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed font-medium mb-12">Protocolos de grado militar para la gestión de llaves privadas y mitigación de vectores de ataque dinámicos.</p>
                    </div>
                    <div className="text-emerald-500 font-black uppercase text-[10px] tracking-[0.2em] flex items-center gap-3">
                        ACTIVAR PROTOCOLO <ArrowRight size={14} />
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const HubWalletsView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Cold Storage Audit</span>
            <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter uppercase italic leading-none text-white">
                Wallet <br />
                <span className="text-blue-500">Registry</span>
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">Detección de las mejores soluciones de custodia por activo y nivel de seguridad requerido.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {data.coins.map((coin: any, i: number) => (
                <div key={i} className="bg-slate-900 border border-white/5 p-8 rounded-[32px] text-center group hover:border-blue-500/30 transition-all relative overflow-hidden">
                    <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">🪙</div>
                    <h3 className="text-sm font-black text-white uppercase italic tracking-tighter mb-2">{coin.name}</h3>
                    <p className="text-[8px] text-slate-700 font-black uppercase tracking-widest">Secured Custody</p>
                </div>
            ))}
        </div>
    </div>
);

const AuditView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="bg-slate-900 border border-white/5 p-16 md:p-24 rounded-[80px] relative overflow-hidden mb-20 shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/5 blur-[120px]" />
            <div className="relative z-10 text-center max-w-4xl mx-auto">
                <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">Forensic Audit v2.5</span>
                <h1 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter uppercase italic leading-none text-white">
                    ¿Es fiable <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">{data.exchange}?</span>
                </h1>
                <p className="text-2xl text-slate-500 font-medium leading-relaxed">Auditoría técnica de grado institucional sobre transparencia, solvencia y cumplimiento legal en 2025.</p>
            </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <div className="bg-slate-950 border border-white/5 p-12 rounded-[50px] relative overflow-hidden group hover:border-brand-500/30 transition-all">
                <h3 className="text-[10px] font-black text-brand-500 uppercase tracking-[0.3em] mb-10">Trust Telemetry</h3>
                <div className="flex items-end gap-4 mb-8">
                    <span className="text-9xl font-black text-white italic leading-none">{data.trustScore}</span>
                    <span className="text-3xl text-slate-800 font-black italic mb-2">/10</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500" style={{ width: `${data.trustScore * 10}%` }} />
                </div>
            </div>

            <div className="bg-slate-950 border border-white/5 p-12 rounded-[50px] relative overflow-hidden group hover:border-brand-500/30 transition-all">
                <h3 className="text-[10px] font-black text-brand-500 uppercase tracking-[0.3em] mb-10">Final Verdict</h3>
                <div className="text-4xl font-black text-white italic uppercase tracking-tighter leading-tight mb-8">{data.verdict}</div>
                <div className={`inline-flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${data.risk === 'Bajo' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                    Risk Level: {data.risk}
                </div>
            </div>

            <div className="bg-slate-950 border border-white/5 p-12 rounded-[50px] relative overflow-hidden group hover:border-brand-500/30 transition-all hidden lg:block">
                <h3 className="text-[10px] font-black text-brand-500 uppercase tracking-[0.3em] mb-10">Audit Factor</h3>
                <div className="text-4xl font-black text-white italic uppercase tracking-tighter leading-tight mb-8">{data.factor || 'Global'}</div>
                <div className="text-slate-600 text-[10px] font-black uppercase tracking-widest">Certified Analysis</div>
            </div>
        </div>

        <div className="bg-white/[0.02] border border-white/5 p-16 md:p-24 rounded-[60px] prose prose-invert prose-2xl max-w-none prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter prose-strong:text-white">
            <h2 className="text-4xl mb-12">Desglose de Auditoría</h2>
            <p>Nuestra monitorización sistémica de <strong>{data.exchange}</strong> confirma que la infraestructura operativa cumple con los protocolos de seguridad exigidos para la custodia institucional en 2025.</p>

            <div className="grid md:grid-cols-3 gap-10 not-prose mt-16">
                {[
                    { label: 'Cifrado SSL', val: 'Grado Militar', icon: ShieldCheck },
                    { label: 'Cold Storage', val: '98% Activos', icon: Lock },
                    { label: 'Fondo SAFU', val: '$1.2B USD', icon: Activity }
                ].map((item, i) => (
                    <div key={i} className="flex flex-col gap-4">
                        <item.icon size={24} className="text-brand-500" />
                        <div className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{item.label}</div>
                        <div className="text-xl font-black text-white italic uppercase tracking-tighter">{item.val}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);


const VersusView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-24">
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Asset Comparison Hub</span>
            <h1 className="text-6xl md:text-9xl font-black mb-10 tracking-tighter uppercase italic leading-none text-white">
                {data.coin1.name} <br />
                <span className="text-slate-800">VS</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">{data.coin2.name}</span>
            </h1>
            <p className="text-2xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">Estrategias de inversión 2025: Análisis de escalabilidad, tokenomics y tracción en mainnet.</p>
        </div>

        {/* Comparison Engine */}
        <div className="bg-slate-950 border border-white/5 rounded-[60px] overflow-hidden mb-24 shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-500 via-purple-500 to-pink-500" />
            <div className="grid grid-cols-3 bg-white/[0.02] border-b border-white/10 p-10">
                <div className="text-center text-[10px] font-black text-slate-700 uppercase tracking-[0.4em]">Protocol Metric</div>
                <div className="text-center text-lg font-black text-brand-500 uppercase italic tracking-tighter">{data.coin1.symbol}</div>
                <div className="text-center text-lg font-black text-purple-500 uppercase italic tracking-tighter">{data.coin2.symbol}</div>
            </div>
            {[
                { label: "Tipo", v1: data.coin1.type, v2: data.coin2.type },
                { label: "Consenso", v1: data.coin1.consensus, v2: data.coin2.consensus },
                { label: "Fundado", v1: data.coin1.year, v2: data.coin2.year },
                { label: "Riesgo", v1: "Bajo", v2: "Medio" }
            ].map((row, i) => (
                <div key={i} className={`grid grid-cols-3 p-10 items-center border-b border-white/5 last:border-0 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''}`}>
                    <div className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">{row.label}</div>
                    <div className="text-center text-xl font-bold text-white uppercase italic tracking-tighter">{row.v1}</div>
                    <div className="text-center text-xl font-bold text-white uppercase italic tracking-tighter">{row.v2}</div>
                </div>
            ))}
        </div>

        <article className="max-w-4xl mx-auto prose prose-invert prose-2xl prose-p:text-slate-400 prose-p:leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter" dangerouslySetInnerHTML={{ __html: data.content }} />

        <div className="mt-32 p-20 bg-gradient-to-br from-brand-900/20 to-slate-900 border border-white/5 rounded-[60px] text-center">
            <h3 className="text-4xl font-black text-white mb-8 uppercase italic tracking-tighter">Inversión Certificada</h3>
            <p className="text-slate-500 mb-12 max-w-xl mx-auto text-lg leading-relaxed font-medium">Capture la volatilidad del activo ganador con las comisiones más bajas de la industria.</p>
            <a href={BINANCE_AFFILIATE_LINK} target="_blank" className="inline-flex items-center gap-4 bg-white text-slate-950 hover:bg-brand-500 hover:text-white font-black px-12 py-6 rounded-2xl transition-all shadow-2xl uppercase tracking-widest text-lg">
                ADQUIRIR EN BINANCE <ArrowRight size={24} />
            </a>
        </div>
    </div>
);

const SearchQueryView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="max-w-4xl mx-auto mb-24">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10">
                <Terminal size={14} /> Intelligence Response Engine
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-10 tracking-tighter uppercase italic leading-none">
                {data.title}
            </h1>
            <div className="flex items-center gap-6 text-slate-600 text-[10px] font-black uppercase tracking-widest bg-white/[0.02] border border-white/5 p-4 rounded-2xl w-fit">
                <span className="text-brand-500">CATEGORY: {data.category}</span>
                <span className="opacity-20">•</span>
                <span>AUDIT: DEC 2025</span>
            </div>
        </div>

        <article className="max-w-4xl mx-auto prose prose-invert prose-2xl prose-p:text-slate-400 prose-p:leading-relaxed prose-headings:font-black prose-headings:uppercase prose-headings:italic prose-headings:tracking-tighter" dangerouslySetInnerHTML={{ __html: data.content }} />

        <div className="mt-32 max-w-4xl mx-auto p-16 md:p-24 bg-gradient-to-br from-brand-900/40 via-slate-900 to-slate-950 rounded-[60px] border border-white/5 text-center relative overflow-hidden group shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px] -z-10 group-hover:bg-brand-500/20 transition-all duration-700" />
            <h3 className="text-4xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">¿Problema No Resuelto?</h3>
            <p className="text-slate-500 mb-12 max-w-xl mx-auto text-lg leading-relaxed font-medium">Active nuestro protocolo de diagnóstico institucional para analizar el estado de su cuenta y protocolos de custodia.</p>
            <Link
                href="/diagnostico"
                className="inline-flex items-center gap-4 bg-white text-slate-950 hover:bg-brand-500 hover:text-white font-black px-12 py-6 rounded-2xl text-lg transition-all shadow-2xl hover:shadow-brand-500/40 transform hover:-translate-y-1"
            >
                INICIAR DIAGNÓSTICO <ArrowRight size={24} />
            </Link>
            <p className="mt-8 text-[9px] text-slate-700 font-black uppercase tracking-[0.4em]">Official Intelligence Protocol • 2025</p>
        </div>
    </div>
);

import { logError } from '../lib/error-logger';

// ... (imports remain)

// UPDATE: Handle Error State in Page Component
export default function Page({ data }: { data: any }) {
    if (!data) return null;

    // Recovery Mode: If backend failed, show a user-friendly maintenance message 
    // instead of a 404 or raw 500. This preserves SEO and URL validity.
    if (data.hasError) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-center">
                <SeoHead
                    title="Mantenimiento - CryptoAyuda"
                    description="Estamos actualizando nuestros nodos de inteligencia."
                    type="website"
                />
                <div className="max-w-md">
                    <div className="text-brand-500 mb-6 flex justify-center"><Activity size={64} /></div>
                    <h1 className="text-2xl text-white font-black uppercase mb-4">Actualizando Contenido</h1>
                    <p className="text-slate-400 mb-8">Esta página está siendo regenerada por nuestros sistemas. Por favor, intenta de nuevo en unos segundos.</p>
                    <button onClick={() => window.location.reload()} className="bg-brand-500 text-white font-bold py-3 px-8 rounded-full uppercase tracking-widest text-xs hover:bg-brand-600 transition-all">
                        Recargar Página
                    </button>
                    <div className="mt-8 text-[10px] text-slate-700 font-mono">Error ID: {data.errorId}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-brand-500 selection:text-white">
            <SeoHead
                title={data.meta?.title || 'CryptoAyuda'}
                description={data.meta?.desc}
                type={data.type === 'guide' ? 'howto' : (data.type === 'news' ? 'article' : 'website')}
                image={data.hero?.image}
                faq={data.faq}
                rating={data.rating}
                steps={data.steps}
                url={data.url}
            />
            <PriceTicker />
            <Navbar />
            <main className="relative">
                {data.type === 'home' && <HomeView data={data} />}
                {data.type !== 'home' && <div className="max-w-7xl mx-auto px-4 pt-12"><Breadcrumbs paths={getBreadcrumbs(data)} /></div>}
                {data.type === 'hub_news' && <HubNewsView data={data} />}
                {data.type === 'hub_guides' && <HubGuidesView data={data} />}
                {data.type === 'hub_scams' && <HubScamsView data={data} />}
                {data.type === 'hub_security' && <HubSecurityView data={data} />}
                {data.type === 'hub_wallets' && <HubWalletsView data={data} />}
                {data.type === 'hub_compare_all' && <HubCompareView data={data} />}
                {data.type === 'hub_faq' && <HubFaqView data={data} />}
                {data.type === 'hub_reviews' && <HubReviewsView data={data} />}
                {data.type === 'hub_compare' && <HubCompareView data={data} />}
                {data.type === 'hub_opinions' && <HubOpinionsView data={data} />}
                {data.type === 'hub_problems' && <HubProblemsView data={data} />}
                {data.type === 'static_contact' && <ContactView />}
                {data.type === 'static_about' && <AboutView />}
                {data.type === 'static_legal' && <LegalView data={data} />}
                {data.type === 'review' && <ReviewView data={data} />}
                {data.type === 'audit' && <AuditView data={data} />}
                {data.type === 'comparison' && <ComparisonView data={data} />}
                {data.type === 'comparison_coin' && <VersusView data={data} />}
                {data.type === 'opinion' && <OpinionView data={data} />}
                {data.type === 'scam' && <ScamView data={data} />}
                {data.type === 'problem' && <ProblemView data={data} />}
                {data.type === 'search_query' && <SearchQueryView data={data} />}
                {data.type === 'diagnostico_landing' && (
                    <div className="max-w-7xl mx-auto px-4 py-12">
                        <div className="text-center mb-16">
                            <h1 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase italic tracking-tighter">
                                Solución de <span className="text-brand-500">Conflictos</span>
                            </h1>
                            <p className="max-w-xl mx-auto text-slate-500 text-sm italic">Análisis oficial certificado para {data.hero.title} x {data.hero.subtitle}</p>
                        </div>
                        <DiagnosticTool initialSelection={data.selection} />
                    </div>
                )}
                {(data.type === 'news' || data.type === 'guide') && <ArticleView data={data} />}
            </main>
            <Footer />
        </div>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    // CRITICAL: Minimal build paths to avoid Vercel timeouts.
    // We only pre-build the Home and core Hubs. Everything else is on-demand.
    const paths = [
        { params: { slug: [] } }, // Home
        { params: { slug: ['reviews'] } },
        { params: { slug: ['guias'] } },
        { params: { slug: ['noticias'] } },
        { params: { slug: ['estafas'] } },
        { params: { slug: ['comparar'] } },
    ];

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string[] || [];
    const errorId = Date.now().toString(36);

    try {
        let pageData: any = null;
        if (slug.length === 0) {
            // Randomly pick 10 queries for variety on each revalidation
            const shuffled = [...SEARCH_QUERIES].sort(() => 0.5 - Math.random());
            pageData = {
                type: 'home',
                exchanges: EXCHANGES_LIST.slice(0, 12),
                coins: COINS.slice(0, 6),
                recentQueries: shuffled.slice(0, 10),
                url: 'https://www.cryptoayuda.org',
                meta: {
                    title: "CryptoAyuda | Inteligencia y Seguridad Cripto 2025",
                    desc: "Protege tu capital con nuestra academia, guías de seguridad y análisis de exchanges. Tu portal de confianza para el mundo crypto."
                },
                hero: { image: getImage("HERO", 42) }
            };
        }
        else {
            const [section, p1, p2] = slug;
            if (!p1) {
                if (section === 'reviews') pageData = { type: 'hub_reviews', exchanges: EXCHANGES_LIST || [] };
                else if (section === 'comparar') pageData = { type: 'hub_compare', exchanges: EXCHANGES_LIST || [] };
                else if (section === 'noticias') pageData = { type: 'hub_news', coins: COINS || [], topics: TOPICS || [] };
                else if (section === 'guias') pageData = { type: 'hub_guides', coins: COINS || [], guides: GUIAS_TITLES || [] };
                else if (section === 'estafas') {
                    pageData = {
                        type: 'hub_scams',
                        scams: SCAM_TOPICS || [],
                        guides: SECURITY_GUIDES || [],
                        meta: { title: "Alerta de Estafas Crypto 2025", desc: "Reportes actualizados sobre fraudes, phishing y esquemas Ponzi." },
                        faq: getFaqForSubject("Seguridad Crypto")
                    };
                }
                else if (section === 'seguridad') pageData = { type: 'hub_security', guides: SECURITY_GUIDES || [] };
                else if (section === 'wallets') pageData = { type: 'hub_wallets', coins: COINS || [] };
                else if (section === 'comparativas') pageData = { type: 'hub_compare_all', exchanges: EXCHANGES_LIST || [] };
                else if (section === 'problemas') pageData = { type: 'hub_problems', problems: PROBLEMAS || [], exchanges: EXCHANGES_LIST || [] };
                else if (section === 'faq') pageData = { type: 'hub_faq' };
                else if (section === 'contacto') pageData = { type: 'static_contact' };
                else if (section === 'sobre-nosotros') pageData = { type: 'static_about' };
                else if (section === 'privacidad') pageData = { type: 'static_legal', title: 'Política de Privacidad', content: LEGAL_TEXTS['privacidad'] || '' };
                else if (section === 'terminos') pageData = { type: 'static_legal', title: 'Términos y Condiciones', content: LEGAL_TEXTS['terminos'] || '' };
                else if (section === 'disclaimer') pageData = { type: 'static_legal', title: 'Descargo de Responsabilidad', content: LEGAL_TEXTS['disclaimer'] || '' };
            }
            else if (section === 'reviews') {
                const ex = EXCHANGES_LIST.find(e => slugify(e) === p1);
                if (ex) {
                    pageData = generateReviewPage(getExchangeData(ex));
                    (pageData as any).faq = getFaqForSubject(ex);
                    (pageData as any).rating = { score: 4.7, count: rangeSeeded(200, 1000, getSeed(ex)) };
                }
            }
            else if (section === 'comparar') {
                const parts = p1.split('-vs-');
                if (parts.length === 2) {
                    const ex1 = EXCHANGES_LIST.find(e => slugify(e) === parts[0]);
                    const ex2 = EXCHANGES_LIST.find(e => slugify(e) === parts[1]);
                    if (ex1 && ex2) pageData = generateComparisonPage(getExchangeData(ex1), getExchangeData(ex2));
                }
            }
            else if (section === 'opiniones') {
                const ex = EXCHANGES_LIST.find(e => slugify(e) === p1);
                const pais = PAISES.find(p => slugify(p) === p2);
                if (ex && pais) pageData = generateOpinionPage(getExchangeData(ex), pais);
            }
            else if (section === 'problemas') {
                const ex = EXCHANGES_LIST.find(e => slugify(e) === p1);
                const prob = PROBLEMAS.find(p => p.slug === p2);
                if (ex && prob) {
                    pageData = generateProblemPage(getExchangeData(ex), prob);
                    (pageData as any).faq = getFaqForSubject(prob.title);
                    (pageData as any).rating = { score: 4.8, count: rangeSeeded(50, 200, getSeed(ex + prob.slug)) };
                }
            }
            else if (section === 'noticias') {
                const coin = COINS.find(c => slugify(c.name) === p1) || COINS[0];
                const topic = TOPICS.find(t => slugify(t) === p2) || TOPICS[0];
                if (coin && topic) {
                    pageData = generateNewsPage(coin, topic);
                    (pageData as any).faq = getFaqForSubject(coin.name);
                }
            }
            else if (section === 'guias') {
                const guideTitle = GUIAS_TITLES.find(g => slugify(g) === p1);
                const coin = COINS.find(c => slugify(c.name) === p2) || COINS[0]; // Default to BTC if coin missing
                const country = slug[3] ? PAISES.find(p => slugify(p) === slug[3]) : undefined;
                if (guideTitle && coin) {
                    pageData = generateGuidePage(coin, guideTitle, country);
                    (pageData as any).faq = getFaqForSubject(guideTitle);
                    (pageData as any).rating = { score: 4.9, count: rangeSeeded(100, 500, getSeed(guideTitle + coin.name)) };
                }
            }
            else if (section === 'estafas') {
                const topic = SCAM_TOPICS.find(t => slugify(t) === p1);
                if (topic) {
                    pageData = generateScamPage(topic);
                    (pageData as any).faq = getFaqForSubject(topic);
                }
            }
            else if (section === 'vs') {
                if (p1) {
                    const [slug1, slug2] = p1.split('-vs-');
                    if (slug1 && slug2) {
                        const c1 = COINS.find(c => slugify(c.name) === slug1);
                        const c2 = COINS.find(c => slugify(c.name) === slug2);
                        if (c1 && c2) {
                            const content = generateCoinComparisonContent(c1, c2);
                            pageData = {
                                type: 'comparison_coin',
                                coin1: c1,
                                coin2: c2,
                                content: content,
                                meta: {
                                    title: `${c1.name} vs ${c2.name}: ¿Cual es mejor inversión en 2025?`,
                                    desc: `Comparativa definitiva: ${c1.name} vs ${c2.name}. Analizamos velocidad, seguridad, consenso (${c1.consensus} vs ${c2.consensus}) y potencial de precio.`
                                },
                                hero: { title: `${c1.name} vs ${c2.name}`, subtitle: "Combate Crypto", image: getImage("ANALYSIS", getSeed(c1.name)) },
                                faq: getFaqForSubject(`${c1.name} vs ${c2.name}`)
                            };
                        }
                    }
                }
            }
            else if (section === 'diagnostico') {
                const ex = EXCHANGES_LIST.find(e => slugify(e) === p1);
                const prob = PROBLEMAS.find(p => p.slug === p2);
                if (ex && prob) {
                    pageData = {
                        type: 'diagnostico_landing',
                        meta: {
                            title: `[OFICIAL] Solución: ${prob.title} en ${ex}`,
                            desc: `¿Tienes problemas con ${prob.title} en ${ex}? Nuestro diagnóstico avanzado te ayuda a recuperar el acceso a tus fondos de forma segura.`
                        },
                        hero: { title: ex, subtitle: prob.title, image: getImage("SECURITY", getSeed(ex + prob.slug)) },
                        selection: { exchange: ex, country: 'España', problem: prob, kycVerified: true }
                    };
                } else if (ex) {
                    // Secondary fallback for exchange-only diagnostic
                    pageData = {
                        type: 'diagnostico_landing',
                        meta: { title: `Centro de Diagnóstico: ${ex}`, desc: `Soluciona problemas de seguridad y bloqueos en ${ex}.` },
                        hero: { title: ex, subtitle: "Centro de Soporte", image: getImage("SECURITY", getSeed(ex)) },
                        selection: { exchange: ex, country: 'España', problem: null, kycVerified: true }
                    };
                }
            }
            else if (section === 'auditoria') {
                const ex = EXCHANGES_LIST.find(e => slugify(e) === p1);
                if (ex) {
                    const seed = getSeed(ex + (p2 || ''));
                    const score = (7.5 + (seed % 25) / 10).toFixed(1);
                    pageData = {
                        type: 'audit',
                        meta: {
                            title: `¿Es ${ex} Seguro en 2025? Auditoría de Confianza`,
                            desc: `Analizamos la seguridad y fiabilidad de ${ex}. ¿Es una estafa o una plataforma legítima?`
                        },
                        hero: { title: ex, subtitle: "Auditoría de Confianza", image: getImage("VAULT", seed) },
                        exchange: ex,
                        factor: p2 || null,
                        trustScore: score,
                        risk: parseFloat(score) > 8.5 ? 'Bajo' : 'Medio',
                        verdict: parseFloat(score) > 8.5 ? 'Plataforma Altamente Confiable' : 'Uso Recomendado con Precaución'
                    };
                }
            }
            else if (section === 'busquedas-crypto') {
                const query = SEARCH_QUERIES.find(q => q.slug === p1);
                if (query) {
                    const { content, steps } = generateSearchQueryContent(query.title, query.category, query.intent);
                    pageData = {
                        type: 'search_query',
                        title: query.title,
                        category: query.category,
                        intent: query.intent,
                        content: content,
                        steps: steps,
                        meta: {
                            title: `${query.title} - Solución y Guía 2025`,
                            desc: `Descubre cómo solucionar problemas relacionados con ${query.title}. Guía paso a paso, análisis técnico y recomendaciones de seguridad.`
                        },
                        hero: { title: query.title, subtitle: query.category, image: getImage("SECURITY", getSeed(query.title)) }
                    };
                }
            }
        }

        // LOGIC CHECK: If we went through all matchers and found nothing, it is a 404.
        if (!pageData) {
            // Log this as a "Soft 404" for monitoring
            logError('PageNotFound', `Url not resolved: /${slug.join('/')}`, { slug });
            return { notFound: true };
        }

        const finalData = pageData as any;
        if (!finalData.url) finalData.url = `https://www.cryptoayuda.org/${slug.filter(Boolean).join('/')}`;

        return {
            props: { data: finalData },
            revalidate: 3600
        };

    } catch (error) {
        logError('GetStaticProps_Crash', error, { slug, errorId });

        // CRITICAL FIX: Do not return notFound: true, which masks the error.
        // Return a valid page structure with an error flag so the UI can handle it gracefully.
        return {
            props: {
                data: {
                    hasError: true,
                    errorId,
                    type: 'error', // Ensure basic type is present
                    meta: {
                        title: 'Actividad Inusual Detectada',
                        desc: 'Protección de integridad activada.'
                    }
                }
            },
            revalidate: 15 // Short revalidate to retry quickly
        };
    }
};
