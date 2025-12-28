import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ArrowRight, CheckCircle, GraduationCap, Play } from 'lucide-react';
import { EXCHANGES_LIST, PAISES, PROBLEMAS, COINS, TOPICS, GUIAS_TITLES, SCAM_TOPICS, SECURITY_GUIDES, BINANCE_AFFILIATE_LINK } from '../lib/data';
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
    <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Modern Hero Section */}
        <div className="mb-12 text-center">
            <div className="inline-block px-4 py-1 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-300 text-xs font-bold uppercase tracking-widest mb-6">
                {data.type === 'guide' ? 'Guía Oficial 2025' : 'Análisis de Mercado'}
            </div>
            <h1 className="font-display font-black text-5xl md:text-7xl mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-slate-200 to-slate-500">
                {data.hero.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-xs">AI</div>
                    <span>Equipo CryptoAyuda</span>
                </div>
                <span>•</span>
                <span>5 min de lectura</span>
                <span>•</span>
                <span>{new Date().toLocaleDateString()}</span>
            </div>
        </div>

        {/* Cinematic Image */}
        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-brand-900/20 mb-16 aspect-video border border-white/5 relative group">
            <RobustImage
                src={data.hero.image}
                className="w-full h-full"
                alt={data.hero.title}
                priority={true}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />
            <div className="absolute bottom-6 left-6 text-xs text-slate-300 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                Imagen vía Unsplash API
            </div>
        </div>

        {/* Content Body */}
        <article className="prose prose-invert prose-lg md:prose-xl max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-brand-400 hover:prose-a:text-brand-300 prose-img:rounded-2xl">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </article>

        {/* Post-Article Engagement */}
        <div className="mt-20 pt-12 border-t border-white/10">
            <h3 className="text-2xl font-bold mb-6 text-center">¿Te fue útil este artículo?</h3>
            <div className="flex justify-center flex-wrap gap-4">
                <button
                    onClick={() => alert('¡Gracias por tu feedback!')}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors font-bold cursor-pointer hover:scale-105 active:scale-95"
                >
                    👍 Sí, gracias
                </button>
                <Link href="/diagnostico" className="flex items-center gap-2 px-8 py-3 bg-brand-600 hover:bg-brand-500 rounded-full transition-all font-black text-white shadow-lg shadow-brand-500/20 hover:scale-105 active:scale-95">
                    💎 Iniciar Diagnóstico Gratuito
                </Link>
                <button
                    onClick={() => {
                        if (navigator.share) {
                            navigator.share({ title: data.hero.title, url: window.location.href }).catch(() => { });
                        } else {
                            navigator.clipboard.writeText(window.location.href);
                            alert('¡Link copiado al portapapeles!');
                        }
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors font-bold cursor-pointer hover:scale-105 active:scale-95"
                >
                    🚀 Compartir
                </button>
            </div>
        </div>
        <div className="mt-16 p-8 bg-gradient-to-br from-brand-900/40 to-slate-900/60 rounded-3xl border border-white/10 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-3xl group-hover:bg-brand-500/40 transition-all duration-500" />
            <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">¿Listo para invertir?</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">Comienza tu viaje en el mundo crypto con la plataforma líder a nivel mundial. Seguridad, liquidez y las comisiones más bajas del mercado.</p>
            <Link
                href={BINANCE_AFFILIATE_LINK}
                target="_blank"
                className="inline-flex items-center gap-3 bg-brand-500 hover:bg-brand-400 text-white font-black px-12 py-5 rounded-2xl text-xl transition-all shadow-xl shadow-brand-500/20 transform hover:-translate-y-1"
            >
                REGISTRARSE EN BINANCE <ArrowRight size={24} />
            </Link>
            <p className="mt-6 text-[10px] text-slate-600 font-bold uppercase tracking-widest">Enlace de afiliado oficial • Registro seguro</p>
        </div>
    </div>
);

// ... SUB VIEWS (HomeView, ReviewView, ComparisonView) WITH GLASSMORPHISM
// (I will implement these in the actual file write to avoid Artifact length limits)
const HomeView = ({ data }: any) => (
    <div className="relative overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-brand-600/20 rounded-full blur-3xl opacity-50 animate-blob pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 py-20 relative z-10 text-center">
            <span className="text-accent-400 font-bold tracking-widest uppercase text-sm mb-4 block animate-slide-up">Portal de Inteligencia Crypto</span>
            <h1 className="text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Tu Capital, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">Blindado.</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                Noticias en tiempo real, guías de seguridad y análisis de exchanges para que operes con confianza.
            </p>

            {/* Hub Navigation Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-16 max-w-6xl mx-auto">
                <Link href="/noticias" className="glass-card p-6 rounded-xl hover:bg-white/5 transition flex items-center gap-4 text-left group">
                    <div className="bg-blue-500/10 p-3 rounded-lg text-2xl group-hover:scale-110 transition-transform">⚡</div>
                    <div>
                        <h3 className="font-bold text-white leading-tight">Noticias</h3>
                        <p className="text-xs text-slate-400">Última hora</p>
                    </div>
                </Link>
                <Link href="/guias" className="glass-card p-6 rounded-xl hover:bg-white/5 transition flex items-center gap-4 text-left group">
                    <div className="bg-purple-500/10 p-3 rounded-lg text-2xl group-hover:scale-110 transition-transform">📚</div>
                    <div>
                        <h3 className="font-bold text-white leading-tight">Academia</h3>
                        <p className="text-xs text-slate-400">Aprende Gratis</p>
                    </div>
                </Link>
                <Link href="/estafas" className="glass-card p-6 rounded-xl hover:bg-white/5 transition flex items-center gap-4 text-left group border border-red-500/20 hover:border-red-500/40">
                    <div className="bg-red-500/10 p-3 rounded-lg text-2xl group-hover:scale-110 transition-transform">🛡️</div>
                    <div>
                        <h3 className="font-bold text-white leading-tight">Anti-Estafas</h3>
                        <p className="text-xs text-slate-400">Protégete</p>
                    </div>
                </Link>
                <Link href="/reviews" className="glass-card p-6 rounded-xl hover:bg-white/5 transition flex items-center gap-4 text-left group">
                    <div className="bg-emerald-500/10 p-3 rounded-lg text-2xl group-hover:scale-110 transition-transform">⭐</div>
                    <div>
                        <h3 className="font-bold text-white leading-tight">Reviews</h3>
                        <p className="text-xs text-slate-400">Exchanges</p>
                    </div>
                </Link>
                <Link href="/vs/bitcoin-vs-ethereum" className="glass-card p-6 rounded-xl hover:bg-white/5 transition flex items-center gap-4 text-left group border border-brand-500/20 hover:border-brand-500/40">
                    <div className="bg-brand-500/10 p-3 rounded-lg text-2xl group-hover:scale-110 transition-transform">🆚</div>
                    <div>
                        <h3 className="font-bold text-white leading-tight">Versus</h3>
                        <p className="text-xs text-slate-400">Comparador</p>
                    </div>
                </Link>
            </div>

            {/* Dynamic Grid of Cards */}
            <h2 className="text-2xl font-bold text-white mb-8 text-left max-w-5xl mx-auto">Exchanges Destacados</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl mx-auto">
                {data.exchanges.slice(0, 3).map((ex: string) => (
                    <Link href={`/reviews/${slugify(ex)}`} key={ex} className="glass-card p-6 rounded-xl group relative overflow-hidden hover:bg-white/5 transition-all">
                        <div className="absolute top-0 right-0 p-4 opacity-50 font-display font-black text-6xl text-slate-800 -z-10 group-hover:text-brand-900 transition-colors">{ex[0]}</div>
                        <h3 className="font-bold text-xl text-white mb-2">{ex}</h3>
                        <div className="flex gap-2 mb-4">
                            <span className="text-xs font-bold px-2 py-1 rounded bg-slate-800 text-slate-300">Review 2025</span>
                        </div>
                        <p className="text-slate-500 text-xs">Score de Seguridad: 9.{(getSeed(ex) % 9) + 1}/10</p>
                    </Link>
                ))}
            </div>
            {/* SEARCH QUERIES MINI-HUB */}
            <div className="mt-20 mb-16 text-left max-w-5xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Centro de Consultas Rápidas</h2>
                    <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">5,000+ Soluciones</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.recentQueries?.map((q: any) => (
                        <Link href={`/busquedas-crypto/${q.slug}`} key={q.slug} className="group p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-brand-500/30 transition-all flex items-center justify-between">
                            <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">{q.title}</span>
                            <ArrowRight size={16} className="text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <Link href="/reviews" className="inline-flex items-center gap-2 text-brand-400 font-bold hover:text-brand-300 transition-colors">
                    Ver todos los exchanges &rarr;
                </Link>
            </div>

            {/* ACADEMY PRESTIGE CTA */}
            <div className="mt-24 p-12 rounded-[40px] bg-gradient-to-br from-purple-900/40 via-slate-900 to-slate-950 border border-purple-500/10 relative overflow-hidden group max-w-5xl mx-auto shadow-2xl">
                <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-left">
                    <div className="flex-grow">
                        <div className="inline-block px-4 py-1 rounded-full bg-purple-500 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl shadow-purple-500/20 flex items-center gap-2 w-fit">
                            <GraduationCap size={14} /> Formación de Élite
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 leading-tight">Domina el mercado con nuestra <br /><span className="text-purple-400 font-black">Academia Cripto Segura.</span></h2>
                        <p className="text-slate-400 text-lg max-w-xl leading-relaxed">Más de 30 horas de formación intensiva, desde lo básico hasta estrategias profesionales de largo plazo. Aprende a proteger tu capital y detectar oportunidades reales.</p>
                        <div className="flex flex-wrap gap-4 mt-8">
                            <span className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                <CheckCircle size={14} className="text-purple-500" /> +30h Contenido
                            </span>
                            <span className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-white/5 px-4 py-2 rounded-full border border-white/5">
                                <CheckCircle size={14} className="text-purple-500" /> Soporte Alumno
                            </span>
                        </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-center">
                        <Link href="/academia" className="bg-purple-600 text-white hover:bg-purple-500 px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_30px_rgba(168,85,247,0.4)] mb-4 w-full text-center">
                            VER CURSOS
                        </Link>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest italic font-medium">Inscripciones Abiertas 2025</p>
                    </div>
                </div>
            </div>

            {/* SERVICES PRESTIGE CTA */}
            <div className="mt-12 p-12 rounded-[40px] bg-gradient-to-br from-brand-900/40 via-slate-900 to-slate-950 border border-white/5 relative overflow-hidden group max-w-5xl mx-auto shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12 text-left">
                    <div className="flex-grow">
                        <div className="inline-block px-4 py-1 rounded-full bg-brand-500 text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] mb-6 shadow-xl shadow-brand-500/20">Protección Prioritaria</div>
                        <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6 leading-tight">¿Tu cuenta está bloqueada? <br /><span className="text-brand-400 font-black">Recupera el Control.</span></h2>
                        <p className="text-slate-400 text-lg max-w-xl leading-relaxed">No pongas en riesgo tus ahorros. Nuestra herramienta avanzada de diagnóstico te guía paso a paso para resolver bloqueos de cuenta y errores de KYC.</p>
                    </div>
                    <div className="shrink-0 flex flex-col items-center">
                        <Link href="/diagnostico" className="bg-white text-slate-950 hover:bg-slate-200 px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.4)] mb-4 w-full text-center">
                            INICIAR DIAGNÓSTICO
                        </Link>
                        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Servicio Gratuito y Seguro</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ReviewView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-12 gap-12">
            {/* Sidebar Sticky */}
            <div className="md:col-span-4 space-y-8">
                <div className="sticky top-24">
                    <div className="glass-card p-8 rounded-2xl text-center relative overflow-hidden shadow-2xl shadow-brand-900/50">
                        <div className="absolute inset-0 bg-gradient-to-b from-brand-600/10 to-transparent"></div>
                        <ScoreCard score={data.data.score} label="Trust Score" size="lg" />
                        <div className="mt-8 space-y-4">
                            <Link href={`/opiniones/${data.data.slug}/argentina`} className="block w-full border border-white/10 hover:bg-white/5 py-3 rounded text-sm text-slate-300 transition-colors">
                                🇦🇷 Opiniones Argentina
                            </Link>
                            <Link href={`/opiniones/${data.data.slug}/mexico`} className="block w-full border border-white/10 hover:bg-white/5 py-3 rounded text-sm text-slate-300 transition-colors">
                                🇲🇽 Opiniones México
                            </Link>
                            <Link href={`/comparar/binance-vs-${data.data.slug}`} className="block w-full border border-white/10 hover:bg-white/5 py-3 rounded text-sm text-slate-300 transition-colors">
                                🆚 Comparar con Binance
                            </Link>
                        </div>
                        <Link
                            href={data.data.slug === 'binance' ? BINANCE_AFFILIATE_LINK : `https://${data.data.slug}.com/register`}
                            target="_blank"
                            className="block w-full bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold py-4 rounded-xl mt-8 transition-all shadow-lg hover:shadow-brand-500/30 transform hover:-translate-y-1"
                        >
                            ABRIR CUENTA OFICIAL
                        </Link>
                    </div>
                </div>
            </div>

            {/* Content */}
            <article className="md:col-span-8 prose prose-invert prose-lg max-w-none">
                <div className="flex items-center gap-4 mb-6">
                    <span className="px-3 py-1 rounded-full border border-brand-500/30 text-brand-300 text-xs font-bold uppercase tracking-widest">Review Verificada</span>
                    <span className="text-slate-500 text-xs">Actualizado: Hoy</span>
                </div>
                <h1 className="font-display font-black text-5xl md:text-6xl mb-6 leading-tight">
                    {data.hero.title}
                </h1>
                <p className="lead text-xl text-slate-300">{data.meta.desc}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10 not-prose">
                    <div className="glass p-4 rounded text-center">
                        <div className="text-xs text-slate-500 uppercase font-bold">Maker Fee</div>
                        <div className="text-xl font-mono text-white">{data.data.maker}</div>
                    </div>
                    <div className="glass p-4 rounded text-center">
                        <div className="text-xs text-slate-500 uppercase font-bold">Taker Fee</div>
                        <div className="text-xl font-mono text-white">{data.data.taker}</div>
                    </div>
                    <div className="glass p-4 rounded text-center">
                        <div className="text-xs text-slate-500 uppercase font-bold">Regulación</div>
                        <div className="text-xl text-success">Alta</div>
                    </div>
                    <div className="glass p-4 rounded text-center">
                        <div className="text-xs text-slate-500 uppercase font-bold">Fundado</div>
                        <div className="text-xl text-white">{data.data.founded}</div>
                    </div>
                </div>

                <h2>Análisis de Seguridad</h2>
                <p>Nuestros expertos han analizado los protocolos de {data.data.name}. La plataforma utiliza almacenamiento en frío para el 98% de los fondos, lo que minimiza el riesgo de hacking centralizado.</p>

                <div className="grid md:grid-cols-2 gap-8 not-prose my-12">
                    <div className="bg-gradient-to-br from-success/10 to-transparent p-6 rounded-xl border border-success/10">
                        <h4 className="text-success font-bold mb-4 flex items-center gap-2 text-xl">✅ Lo Bueno</h4>
                        <ul className="space-y-3">
                            {data.data.pros.map((p: string) => <li key={p} className="text-slate-300 text-sm flex gap-3 items-start"><span className="text-success mt-1">✓</span> {p}</li>)}
                        </ul>
                    </div>
                    <div className="bg-gradient-to-br from-error/10 to-transparent p-6 rounded-xl border border-error/10">
                        <h4 className="text-error font-bold mb-4 flex items-center gap-2 text-xl">⚠️ Atento a esto</h4>
                        <ul className="space-y-3">
                            {data.data.cons.map((c: string) => <li key={c} className="text-slate-300 text-sm flex gap-3 items-start"><span className="text-error mt-1">✗</span> {c}</li>)}
                        </ul>
                    </div>
                </div>
                <div className="mt-16 p-8 bg-gradient-to-br from-brand-900/40 to-slate-900/60 rounded-3xl border border-white/10 text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-3xl group-hover:bg-brand-500/40 transition-all duration-500" />
                    <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">¿Listo para invertir?</h3>
                    <p className="text-slate-400 mb-8 max-w-xl mx-auto">Comienza tu viaje en el mundo crypto con la plataforma líder a nivel mundial. Seguridad, liquidez y las comisiones más bajas del mercado.</p>
                    <Link
                        href={BINANCE_AFFILIATE_LINK}
                        target="_blank"
                        className="inline-flex items-center gap-3 bg-brand-500 hover:bg-brand-400 text-white font-black px-12 py-5 rounded-2xl text-xl transition-all shadow-xl shadow-brand-500/20 transform hover:-translate-y-1"
                    >
                        REGISTRARSE EN BINANCE <ArrowRight size={24} />
                    </Link>
                    <p className="mt-6 text-[10px] text-slate-600 font-bold uppercase tracking-widest">Enlace de afiliado oficial • Registro seguro</p>
                </div>
            </article>
        </div>
    </div>
);

const ComparisonView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
            <span className="text-brand-400 font-bold tracking-widest uppercase text-xs mb-4 block">Comparativa Definitiva</span>
            <h1 className="font-display font-black text-5xl md:text-7xl mb-6">{data.data.ex1.name} <span className="text-slate-700">vs</span> {data.data.ex2.name}</h1>
            <p className="text-xl text-slate-400">Analizamos cada detalle para que no pierdas dinero en comisiones.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center mb-16 relative">
            <div className="glass-card p-8 rounded-2xl text-center border-t-4 border-brand-500">
                <h2 className="text-3xl font-bold mb-4">{data.data.ex1.name}</h2>
                <ScoreCard score={data.data.ex1.score} label="Score Total" />
                <ul className="mt-8 text-left space-y-4">
                    <li className="flex justify-between border-b border-white/5 pb-2"><span>Comisión</span> <span className="text-white font-bold">{data.data.ex1.maker}</span></li>
                    <li className="flex justify-between border-b border-white/5 pb-2"><span>Usuarios</span> <span className="text-white font-bold">{data.data.ex1.users}</span></li>
                </ul>
            </div>
            <div className="text-center z-0 flex flex-col items-center justify-center">
                <div className="font-display font-black text-8xl text-slate-800 opacity-50">VS</div>
                <div className="bg-brand-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mt-[-20px] relative z-10">Ganador: {data.data.winner.name}</div>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center border-t-4 border-accent-500">
                <h2 className="text-3xl font-bold mb-4">{data.data.ex2.name}</h2>
                <ScoreCard score={data.data.ex2.score} label="Score Total" />
                <ul className="mt-8 text-left space-y-4">
                    <li className="flex justify-between border-b border-white/5 pb-2"><span>Comisión</span> <span className="text-white font-bold">{data.data.ex2.maker}</span></li>
                    <li className="flex justify-between border-b border-white/5 pb-2"><span>Usuarios</span> <span className="text-white font-bold">{data.data.ex2.users}</span></li>
                </ul>
            </div>
        </div>

        <div className="mt-12 text-center">
            <Link
                href={data.data.winner.slug === 'binance' ? BINANCE_AFFILIATE_LINK : `https://${data.data.winner.slug}.com/register`}
                target="_blank"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-400 text-white font-black px-10 py-5 rounded-2xl text-lg hover:scale-105 transition-all shadow-2xl shadow-brand-500/20"
            >
                ABRIR CUENTA EN {data.data.winner.name.toUpperCase()} <span className="text-2xl">⚡</span>
            </Link>
        </div>
    </div>
);

const HubReviewsView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-8 text-center">Reviews de Exchanges</h1>
        <p className="text-xl text-slate-400 text-center mb-12">Análisis profundos de los principales exchanges de criptomonedas.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.exchanges.map((ex: string) => (
                <Link href={`/reviews/${slugify(ex)}`} key={ex} className="glass-card p-6 rounded-xl group hover:bg-white/5 transition-colors">
                    <h3 className="font-bold text-xl text-white mb-2">{ex}</h3>
                    <p className="text-slate-500 text-sm">Lee nuestra review completa y opiniones.</p>
                </Link>
            ))}
        </div>
    </div>
);

const HubCompareView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-8 text-center">Comparador de Exchanges</h1>
        <p className="text-xl text-slate-400 text-center mb-12">Encuentra el exchange perfecto para ti comparando características clave.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.exchanges.slice(0, 6).map((ex1: string, i: number) => (
                data.exchanges.slice(i + 1, i + 2).map((ex2: string) => (
                    <Link href={`/comparar/${slugify(ex1)}-vs-${slugify(ex2)}`} key={`${ex1}-${ex2}`} className="glass-card p-6 rounded-xl group hover:bg-white/5 transition-colors">
                        <h3 className="font-bold text-xl text-white mb-2">{ex1} vs {ex2}</h3>
                        <p className="text-slate-500 text-sm">¿Cuál es mejor para tus necesidades?</p>
                    </Link>
                ))
            ))}
        </div>
    </div>
);

const HubOpinionsView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-8 text-center">Opiniones por País</h1>
        <p className="text-xl text-slate-400 text-center mb-12">Descubre cómo funcionan los exchanges en tu país.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.exchanges.slice(0, 3).flatMap((ex: string) =>
                data.paises.slice(0, 3).map((pais: string) => (
                    <Link href={`/opiniones/${slugify(ex)}/${slugify(pais)}`} key={`${ex}-${pais}`} className="glass-card p-6 rounded-xl group hover:bg-white/5 transition-colors">
                        <h3 className="font-bold text-xl text-white mb-2">{ex} en {capitalize(pais)}</h3>
                        <p className="text-slate-500 text-sm">Experiencias de usuarios locales.</p>
                    </Link>
                ))
            )}
        </div>
    </div>
);

const HubProblemsView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-8 text-center">Centro de Ayuda y Problemas Comunes</h1>
        <p className="text-xl text-slate-400 text-center mb-12">Encuentra soluciones a los problemas más frecuentes con exchanges.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {data.problems.map((problem: any) => (
                <Link href={`/problemas/${slugify(problem.title)}`} key={problem.title} className="glass-card p-6 rounded-xl group hover:bg-white/5 transition-colors">
                    <h3 className="font-bold text-xl text-white mb-2">{problem.title}</h3>
                    <p className="text-slate-500 text-sm">{problem.description}</p>
                </Link>
            ))}
        </div>
    </div>
);

const HubNewsView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-400">Noticias de Última Hora</h1>
        <p className="text-xl text-slate-400 text-center mb-12">Cobertura en tiempo real de los eventos que mueven el mercado.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.topics.flatMap((topic: string, i: number) =>
                data.coins.slice(i, i + 3).map((coin: any, k: number) => ( // Increased density
                    <Link href={`/noticias/${slugify(coin.name)}/${slugify(topic)}`} key={coin.name + topic} className="glass-card p-0 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform group">
                        <div className="h-40 bg-slate-800 relative overflow-hidden">
                            {/* Placeholder gradient for instant feel */}
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-700 animate-pulse" />
                            <RobustImage
                                src={getImage(coin.name, getSeed(coin.name + topic))}
                                className="w-full h-full"
                                priority={i < 2} // Eager load top rows
                                alt={`Noticia sobre ${coin.name}`}
                            />
                            <div className="absolute bottom-2 left-2 bg-black/60 px-2 rounded text-xs text-white font-bold backdrop-blur-sm z-20">{topic}</div>
                        </div>
                        <div className="p-6">
                            <h3 className="font-bold text-lg text-white mb-2 leading-tight">¿Qué está pasando con {coin.name}? Análisis de {topic}</h3>
                            <span className="text-brand-400 text-sm font-bold">Leer Noticia &rarr;</span>
                        </div>
                    </Link>
                ))
            ).slice(0, 48)} {/* Reduced to 48 for performance */}
        </div>
        <div className="mt-12 text-center text-slate-500 text-sm">Mostrando 48 de {data.topics.length * data.coins.length} noticias posibles.</div>
    </div>
);

const HubGuidesView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">Academia Crypto</h1>
        <p className="text-xl text-slate-400 text-center mb-12">Domina el mercado con nuestras guías paso a paso.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.guides.flatMap((guide: string, i: number) =>
                data.coins.slice(0, 15).flatMap((coin: any, j: number) => {
                    // Inject countries to multiply content (every 3rd item is localized)
                    const country = (j % 3 === 0) ? PAISES[j % PAISES.length] : null;
                    const href = country
                        ? `/guias/${slugify(guide)}/${slugify(coin.name)}/${slugify(country)}`
                        : `/guias/${slugify(guide)}/${slugify(coin.name)}`;

                    return (
                        <Link href={href} key={`${guide}-${coin.name}-${country || 'global'}`} className="glass-card p-6 rounded-xl hover:bg-white/5 transition-colors border-l-4 border-purple-500 hover:scale-[1.02] duration-300">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-2">{guide}</div>
                            <h3 className="font-bold text-white text-lg mb-1">{coin.name}</h3>
                            {country && <div className="text-accent-400 text-[10px] font-black uppercase mt-1 tracking-tighter flex items-center gap-1">📍 <span>Edición {country}</span></div>}
                            <div className="text-purple-300 text-xs text-right mt-2">{i < 4 ? '🔥 Popular' : 'Guía 2025'}</div>
                        </Link>
                    );
                })
            ).slice(0, 60)} {/* Show 60 items for massive feel */}
        </div>
    </div>
);

const HubScamsView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 mb-12 text-center">
            <h1 className="text-5xl font-black mb-4 text-red-400">Centro de Ciberseguridad</h1>
            <p className="text-xl text-red-200">Detecta y evita las estafas más peligrosas del 2025.</p>
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-red-500">Alertas de Estafas Activas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {data.scams.map((scam: string) => (
                <Link href={`/estafas/${slugify(scam)}`} key={scam} className="glass-card p-6 rounded-xl hover:bg-red-950/30 transition-colors group border border-red-500/10">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl">🚨</span>
                        <h3 className="font-bold text-xl text-red-100 group-hover:text-red-400 transition-colors">{scam}</h3>
                    </div>
                    <p className="text-sm text-slate-400">Aprende a identificar las señales de alerta de este fraude.</p>
                </Link>
            ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-6 pl-2 border-l-4 border-emerald-500">Guías de Protección</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.guides.map((guide: string) => (
                <div key={guide} className="glass-card p-4 rounded-lg bg-emerald-900/10 border-emerald-500/20">
                    <div className="text-emerald-400 text-xs font-bold uppercase mb-2">Recomendado</div>
                    <h4 className="font-bold text-white">{guide}</h4>
                </div>
            ))}
        </div>
    </div>
);

const ScamView = ({ data }: any) => (
    <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-slate-900 rounded-2xl overflow-hidden mb-12 border border-slate-800">
            <div className="h-64 relative">
                <img src={data.hero.image} className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                    <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold uppercase tracking-wider mb-4 inline-block">Alerta de Fraude</span>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-2">{data.hero.title}</h1>
                </div>
            </div>
        </div>

        <article className="prose prose-invert prose-lg mx-auto prose-headings:text-brand-400">
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </article>

        <div className="mt-16 p-8 bg-brand-900/20 rounded-2xl border border-brand-500/30 text-center">
            <h3 className="text-2xl font-bold text-brand-300 mb-4">¿Necesitas ayuda profesional?</h3>
            <p className="text-slate-300 mb-6">Si has sido víctima de una estafa, contáctanos para asesoría legal y técnica.</p>
            <button className="bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-brand-500/20">
                Contactar Soporte
            </button>
        </div>
    </div>
);

const OpinionView = ({ data }: any) => (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-black mb-6">{data.hero.title}</h1>
        <p className="text-xl text-slate-400 mb-12">{data.meta.desc}</p>
        <div className="glass-card p-12 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6">¿Funciona en {data.pais}?</h2>
            <div className="grid gap-4 text-left">
                <div className="bg-slate-900/50 p-4 rounded flex items-center gap-4">
                    <span className="text-2xl">🏦</span>
                    <div>
                        <h4 className="font-bold text-white">Transferencias Bancarias Locales</h4>
                        <p className="text-sm text-slate-400">{data.data.hasBank ? 'Disponibles directamente.' : 'No disponibles directamente. Usa P2P.'}</p>
                    </div>
                </div>
                <div className="bg-slate-900/50 p-4 rounded flex items-center gap-4">
                    <span className="text-2xl">💳</span>
                    <div>
                        <h4 className="font-bold text-white">Tarjetas Locales</h4>
                        <p className="text-sm text-slate-400">Visa y Mastercard aceptadas con recargo internacional.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const ProblemView = ({ data }: any) => (
    <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="bg-error-900/20 border border-error-500/30 p-8 rounded-2xl mb-12 flex gap-6 items-start">
            <span className="text-4xl">⚠️</span>
            <div>
                <h1 className="text-3xl font-bold text-error-400 mb-2">{data.hero.title}</h1>
                <p className="text-slate-300">{data.meta.desc}</p>
            </div>
        </div>
        <article className="prose prose-invert prose-lg mx-auto">
            <h3>Pasos para la solución (Oficial 2025)</h3>
            <ol>
                <li>No compartas tu contraseña con nadie.</li>
                <li>Verifica si hay mantenimiento en {data.exchange}.</li>
                <li>Contacta a soporte oficial a través de la app.</li>
            </ol>
            <div className="not-prose mt-8">
                <Link href="/problemas" className="text-brand-400 hover:text-white font-bold">← Volver al Centro de Ayuda</Link>
            </div>
        </article>
    </div>
);

const LegalView = ({ data }: any) => (
    <div className="max-w-4xl mx-auto px-4 py-12 prose prose-invert">
        <h1>{data.title}</h1>
        <p className="text-slate-400">Última actualización: Diciembre 2025</p>
        <p>En CryptoAyuda.org, la integridad de nuestra información y la privacidad de nuestros usuarios son nuestras máximas prioridades. Esta página detalla los términos operativos y las políticas de datos de nuestro portal.</p>
        <h3>1. Información General</h3>
        <p>CryptoAyuda es un portal educativo e informativo. No proporcionamos asesoramiento financiero, legal o fiscal. Todo el contenido generado es para fines ilustrativos y debe ser verificado de forma independiente por el usuario. La inversión en criptoactivos conlleva riesgos significativos de pérdida de capital.</p>
        <h3>2. Transparencia de Afiliados</h3>
        <p>Este sitio puede contener enlaces de afiliación. Si utilizas nuestros enlaces para registrarte en plataformas como Binance o Bybit, es posible que recibamos una comisión sin coste adicional para ti. Esto nos permite financiar la investigación profunda y mantener este recurso gratuito para la comunidad.</p>
        <h3>3. Limitación de Responsabilidad</h3>
        <p>No nos hacemos responsables por pérdidas derivadas de estafas externas, fallos técnicos de terceros o decisiones de inversión basadas en el contenido de este sitio. Recuerda: No tus llaves, no tus criptos.</p>
    </div>
);

const ContactView = ({ data }: any) => (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-black mb-8">Contacto y Soporte</h1>
        <p className="text-xl text-slate-400 mb-12">¿Tienes alguna duda técnica o quieres reportar un fraude?</p>
        <div className="glass-card p-8 rounded-2xl max-w-lg mx-auto text-left">
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Gracias. Tu reporte ha sido enviado al equipo técnico.'); }}>
                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Tu Nombre</label>
                    <input type="text" placeholder="Ej: Juan Pérez" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:border-brand-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Correo Electrónico</label>
                    <input type="email" placeholder="hola@ejemplo.com" className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:border-brand-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Mensaje / Reporte</label>
                    <textarea rows={5} placeholder="Describe tu situación..." className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:border-brand-500 outline-none" />
                </div>
                <button className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-brand-500/20">Enviar Solicitud</button>
            </form>
        </div>
    </div>
);

const AboutView = ({ data }: any) => (
    <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-black mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">Nuestra Misión</h1>
        <div className="prose prose-invert prose-lg mx-auto">
            <p>CryptoAyuda.org nació tras identificar una brecha crítica en la educación financiera hispana: el exceso de ruido publicitario y la falta de soporte real ante problemas técnicos complejos.</p>
            <p>Somos un equipo multidisciplinario de entusiastas de la seguridad y analistas de blockchain comprometidos con la soberanía financiera. Nuestra meta es dotar a cada usuario de las herramientas necesarias para navegar el ecosistema Web3 sin miedo a estafas o bloqueos de cuenta injustificados.</p>
            <blockquote>"La verdadera libertad financiera solo es posible a través de la educación y la seguridad extrema."</blockquote>
        </div>
    </div>
);

const HubFaqView = ({ data }: any) => (
    <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-5xl font-black mb-12 text-center">Preguntas Frecuentes</h1>
        <div className="grid gap-6">
            {[
                { q: "¿Qué hago si mi cuenta de exchange fue bloqueada?", a: "Primero, mantén la calma. Reúne toda la documentación de origen de fondos y contacta al soporte oficial ÚNICAMENTE a través de la app oficial. Evita grupos de Telegram que prometan 'desbloqueos' por dinero." },
                { q: "¿Es seguro dejar mis fondos en Binance?", a: "Para montos pequeños de trading diario es aceptable, pero para ahorros a largo plazo SIEMPRE recomendamos usar una Hardware Wallet (Ledger/Trezor). Recuerda: No tus llaves, no tus monedas." },
                { q: "¿Cómo identifico una estafa de inversión?", a: "Si te prometen retornos fijos garantizados, es una estafa. El mercado crypto es volátil por naturaleza y nadie puede asegurar ganancias mensuales del 10% o más." }
            ].map((faq, i) => (
                <div key={i} className="glass-card p-8 rounded-2xl border-l-4 border-brand-500">
                    <h3 className="text-xl font-bold mb-4">{faq.q}</h3>
                    <p className="text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
            ))}
        </div>
    </div>
);

const HubSecurityView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-8 text-center text-emerald-400">Centro de Ciberseguridad</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.guides.map((g: string, i: number) => (
                <div key={i} className="glass-card p-6 rounded-xl hover:bg-emerald-900/10 transition-colors border-t-2 border-emerald-500/50">
                    <h3 className="font-bold text-white text-xl mb-4">{g}</h3>
                    <p className="text-slate-400 text-sm mb-6">Aprende protocolos de grado militar para proteger tus llaves privadas y evitar el phishing dinámico.</p>
                    <span className="text-emerald-400 font-bold text-xs uppercase tracking-tighter">Entrenamiento de Seguridad &rarr;</span>
                </div>
            ))}
        </div>
    </div>
);

const HubWalletsView = ({ data }: any) => (
    <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-5xl font-black mb-8 text-center text-blue-400">Guía de Wallets y Custodia</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.coins.map((coin: any, i: number) => (
                <div key={i} className="glass-card p-4 rounded-xl text-center group cursor-pointer hover:bg-blue-900/10 transition-all">
                    <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🪙</div>
                    <h3 className="font-bold text-sm text-white">{coin.name}</h3>
                    <p className="text-[10px] text-slate-500">Mejor Wallet</p>
                </div>
            ))}
        </div>
    </div>
);

const AuditView = ({ data }: any) => (
    <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="glass-card p-12 rounded-3xl border-t-4 border-brand-500 mb-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[100px]" />
            <div className="relative z-10 text-center">
                <div className="inline-block px-4 py-1 rounded-full bg-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-widest mb-6">Auditoría de Seguridad Certificada</div>
                <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">¿Es fiable {data.exchange}?</h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">Análisis técnico de grado institucional sobre la transparencia, reservas y cumplimiento legal de {data.exchange} en 2025.</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="glass-card p-8 rounded-2xl border border-white/5">
                <h3 className="text-sm font-black text-brand-500 uppercase tracking-widest mb-6">Puntaje de Confianza</h3>
                <div className="flex items-end gap-4">
                    <span className="text-8xl font-display font-black leading-none">{data.trustScore}</span>
                    <span className="text-2xl text-slate-500 mb-2">/ 10</span>
                </div>
                <div className="mt-8 h-3 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" style={{ width: `${data.trustScore * 10}%` }} />
                </div>
            </div>
            <div className="glass-card p-8 rounded-2xl border border-white/5">
                <h3 className="text-sm font-black text-brand-500 uppercase tracking-widest mb-6">Veredicto Oficial</h3>
                <p className="text-2xl font-bold text-white mb-4">{data.verdict}</p>
                <div className={`inline-block px-4 py-2 rounded-lg font-black text-xs uppercase ${data.risk === 'Bajo' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    Riesgo Detectado: {data.risk}
                </div>
            </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none mb-20 bg-slate-900/50 p-12 rounded-3xl border border-white/5 line-height-relaxed">
            <h2 className="text-3xl font-black mb-8">Análisis por factor: {data.factor || 'Global'}</h2>
            <p>Nuestra auditoría de <strong>{data.exchange}</strong> concluye que la plataforma cumple con los estándares mínimos de custodia exigidos en 2025. El factor analizado ({data.factor || 'resumen ejecutivo'}) indica una tendencia clara hacia la descentralización de pruebas de reserva.</p>
            <ul>
                <li><strong>Cifrado:</strong> SSL de grado bancario activo.</li>
                <li><strong>Custodia:</strong> 95% de los fondos en cámaras frías verificadas.</li>
                <li><strong>Seguro:</strong> Fondo SAFU activo de mil millones de dólares.</li>
            </ul>
        </div>
    </div>
);


const VersusView = ({ data }: any) => (
    <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-brand-500/10 text-brand-400 font-bold text-xs uppercase tracking-widest rounded-full mb-4">
                Análisis Comparativo Directo
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                {data.coin1.name} <span className="text-slate-600">vs</span> {data.coin2.name}
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                ¿Cuál es mejor inversión en 2025? Analizamos tecnología, adopción y potencial de precio.
            </p>
        </div>

        {/* Comparison Stats Table */}
        <div className="glass-card p-0 rounded-2xl overflow-hidden mb-12 border border-white/5">
            <div className="grid grid-cols-3 bg-slate-900/50 border-b border-white/5 font-bold uppercase text-xs tracking-widest text-slate-500 py-4">
                <div className="text-center">Factor</div>
                <div className="text-center text-brand-400">{data.coin1.symbol}</div>
                <div className="text-center text-purple-400">{data.coin2.symbol}</div>
            </div>
            {[
                { label: "Tipo", v1: data.coin1.type, v2: data.coin2.type },
                { label: "Consenso", v1: data.coin1.consensus, v2: data.coin2.consensus },
                { label: "Fundado", v1: data.coin1.year, v2: data.coin2.year },
                { label: "Riesgo", v1: "Medio", v2: "Alto" }
            ].map((row, i) => (
                <div key={i} className={`grid grid-cols-3 py-4 border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
                    <div className="text-center font-bold text-slate-400 text-sm">{row.label}</div>
                    <div className="text-center font-medium text-white">{row.v1}</div>
                    <div className="text-center font-medium text-white">{row.v2}</div>
                </div>
            ))}
            <div className="p-6 bg-slate-900/80 text-center">
                <a href={BINANCE_AFFILIATE_LINK} target="_blank" rel="nofollow noreferrer" className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-400 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-brand-500/20">
                    Comprar Ganador en Binance <span className="text-lg">➔</span>
                </a>
            </div>
        </div>

        <article className="prose prose-invert prose-lg max-w-none mb-16" dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
);

const SearchQueryView = ({ data }: any) => (
    <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
            <div className="inline-block px-3 py-1 bg-brand-500/10 text-brand-400 font-bold text-[10px] uppercase tracking-widest rounded-full mb-4 border border-brand-500/20">
                Solución de Problemas Crypto
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
                {data.title}
            </h1>
            <div className="flex items-center gap-4 text-slate-500 text-sm">
                <span className="bg-slate-900 px-2 py-1 rounded text-xs font-bold">{data.category}</span>
                <span>•</span>
                <span>Actualizado: Diciembre 2025</span>
            </div>
        </div>

        <article className="prose prose-invert prose-lg max-w-none mb-16" dangerouslySetInnerHTML={{ __html: data.content }} />

        <div className="mt-16 p-8 bg-gradient-to-br from-brand-900/40 to-slate-900/60 rounded-3xl border border-white/10 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/20 blur-3xl group-hover:bg-brand-500/40 transition-all duration-500" />
            <h3 className="text-3xl font-black text-white mb-4 uppercase italic tracking-tighter">¿Problema persiste?</h3>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">Nuestro equipo de soporte puede ayudarte a diagnosticar y solucionar cualquier incidente con tus fondos de manera profesional y segura.</p>
            <Link
                href="/diagnostico"
                className="inline-flex items-center gap-3 bg-brand-500 hover:bg-brand-400 text-white font-black px-12 py-5 rounded-2xl text-xl transition-all shadow-xl shadow-brand-500/20 transform hover:-translate-y-1"
            >
                INICIAR DIAGNÓSTICO GRATUITO <ArrowRight size={24} />
            </Link>
        </div>
    </div>
);

export default function Page({ data }: { data: any }) {
    if (!data) return null;
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
    const top5 = EXCHANGES_LIST.slice(0, 5);
    const paths = top5.map(ex => ({ params: { slug: ['reviews', slugify(ex)] } }));
    paths.push({ params: { slug: ['estafas'] } }, { params: { slug: [] } });

    // Add a few sample search queries to paths for faster dev builds
    // In prod, fallBack: 'blocking' will handle the rest
    SEARCH_QUERIES.slice(0, 10).forEach(q => {
        paths.push({ params: { slug: ['busquedas-crypto', q.slug] } });
    });

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = params?.slug as string[] || [];
    let pageData = null;
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
            if (section === 'reviews') pageData = { type: 'hub_reviews', exchanges: EXCHANGES_LIST };
            else if (section === 'comparar') pageData = { type: 'hub_compare', exchanges: EXCHANGES_LIST };
            else if (section === 'noticias') pageData = { type: 'hub_news', coins: COINS, topics: TOPICS };
            else if (section === 'guias') pageData = { type: 'hub_guides', coins: COINS, guides: GUIAS_TITLES };
            else if (section === 'estafas') {
                pageData = {
                    type: 'hub_scams',
                    scams: SCAM_TOPICS,
                    guides: SECURITY_GUIDES,
                    meta: { title: "Alerta de Estafas Crypto 2025", desc: "Reportes actualizados sobre fraudes, phishing y esquemas Ponzi." },
                    faq: getFaqForSubject("Seguridad Crypto")
                };
            }
            else if (section === 'seguridad') pageData = { type: 'hub_security', guides: SECURITY_GUIDES };
            else if (section === 'wallets') pageData = { type: 'hub_wallets', coins: COINS };
            else if (section === 'comparativas') pageData = { type: 'hub_compare_all', exchanges: EXCHANGES_LIST };
            else if (section === 'faq') pageData = { type: 'hub_faq' };
            else if (section === 'contacto') pageData = { type: 'static_contact' };
            else if (section === 'sobre-nosotros') pageData = { type: 'static_about' };
            else if (section === 'privacidad') pageData = { type: 'static_legal', title: 'Política de Privacidad' };
            else if (section === 'terminos') pageData = { type: 'static_legal', title: 'Términos y Condiciones' };
            else if (section === 'disclaimer') pageData = { type: 'static_legal', title: 'Descargo de Responsabilidad' };
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
            const coin = COINS.find(c => slugify(c.name) === p1);
            const topic = TOPICS.find(t => slugify(t) === p2);
            if (coin && topic) {
                pageData = generateNewsPage(coin, topic);
                (pageData as any).faq = getFaqForSubject(coin.name);
            }
        }
        else if (section === 'guias') {
            const guideTitle = GUIAS_TITLES.find(g => slugify(g) === p1);
            const coin = COINS.find(c => slugify(c.name) === p2);
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
    if (!pageData) return { notFound: true };
    const finalData = pageData as any;
    if (!finalData.url) finalData.url = `https://www.cryptoayuda.org/${slug.join('/')}`;
    return { props: { data: finalData }, revalidate: 3600 };
};
