import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PriceTicker from '../components/PriceTicker';
import { COURSES } from '../lib/courseData';
import {
    Check,
    ShieldCheck,
    BookOpen,
    Clock,
    Users,
    Zap,
    Award,
    ArrowRight,
    Play,
    Star,
    GraduationCap,
    Lock,
    CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useCryptoPrice } from '../hooks/useCryptoPrice';

export default function AcademiaLanding() {
    const { price: usdtPrice } = useCryptoPrice();

    const plans = [
        {
            key: 'base',
            ...COURSES['base'],
            popular: false,
            features: [
                'Certificado: ' + COURSES['base'].certification.name,
                ...COURSES['base'].competencies,
                'Acceso de por vida',
                'Simulaciones de Seguridad'
            ],
            color: 'slate',
            accent: 'blue',
            cta: 'Empezar Seguro'
        },
        {
            key: 'pro',
            ...COURSES['pro'],
            popular: true,
            features: [
                'Certificado: ' + COURSES['pro'].certification.name,
                ...COURSES['pro'].competencies,
                'Simulador de Trading',
                'Casos de Estudio Reales'
            ],
            color: 'brand',
            accent: 'brand',
            cta: 'El Más Elegido'
        },
        {
            key: 'mastery',
            ...COURSES['mastery'],
            popular: false,
            features: [
                'Certificado: ' + COURSES['mastery'].certification.name,
                ...COURSES['mastery'].competencies,
                'Auditoría de Smart Contracts',
                'Estrategias Institucionales'
            ],
            color: 'purple',
            accent: 'purple',
            cta: 'Carrera Profesional'
        }
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
            <Head>
                <title>Academia Cripto Segura | Formación Profesional de Élite</title>
                <meta name="description" content="Domina las criptomonedas con seguridad institucional. Formación técnica para inversores que buscan excelencia y protección de capital." />
            </Head>

            <Navbar />

            <main className="relative overflow-hidden">
                {/* Visual Energy Background */}
                <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-brand-500/5 blur-[150px] rounded-full pointer-events-none" />
                <div className="absolute top-[500px] right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[150px] rounded-full pointer-events-none" />

                {/* Hero Section */}
                <section className="relative pt-48 pb-32 px-4 shadow-2xl">
                    <div className="max-w-7xl mx-auto text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 px-6 py-2 rounded-full mb-12"
                        >
                            <Zap size={14} className="text-brand-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-400">Educational Excellence 2025</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-8xl font-black mb-10 tracking-tighter uppercase italic leading-[0.9]"
                        >
                            Domina el Futuro <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">Sin Concesiones</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl text-slate-400 max-w-3xl mx-auto mb-16 leading-relaxed"
                        >
                            La educación es el activo más valioso en el mercado cripto. Nuestra academia ofrece formación técnica de alto nivel para que operes con la seguridad de un profesional.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-6"
                        >
                            <a href="#planes" className="bg-white text-slate-950 hover:bg-brand-500 hover:text-white font-black px-12 py-6 rounded-2xl text-lg transition-all shadow-2xl hover:shadow-brand-500/30 transform hover:-translate-y-1 flex items-center gap-3 decoration-none">
                                EXPLORAR PROGRAMAS <ArrowRight size={20} />
                            </a>
                            <Link href="/acceso/login" className="px-10 py-5 rounded-2xl border border-white/10 hover:bg-white/5 text-xs font-black uppercase tracking-widest transition-all">
                                Portal Alumnos
                            </Link>
                        </motion.div>
                    </div>
                </section>

                {/* Elite Stats */}
                <section className="py-20 border-y border-white/5 bg-white/[0.01]">
                    <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { label: 'Alumnos Formados', value: '12,400+', icon: <Users size={20} /> },
                            { label: 'Horas de Contenido', value: '80h+', icon: <Clock size={20} /> },
                            { label: 'Tasa de Éxito', value: '98.4%', icon: <Award size={20} /> },
                            { label: 'Soporte 24/7', value: 'Elite', icon: <ShieldCheck size={20} /> }
                        ].map((stat, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-slate-500 mx-auto mb-4 group-hover:text-brand-500 transition-colors">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-black text-white italic mb-1 uppercase tracking-tighter">{stat.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-600">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Methodology Grid */}
                <section className="py-32 px-4">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-1">
                                <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-8 leading-none">
                                    Ingeniería <br /><span className="text-brand-500">Pedagógica</span>
                                </h2>
                                <p className="text-slate-500 text-lg mb-8">
                                    No solo enseñamos a comprar cripto. Formamos el criterio necesario para sobrevivir y prosperar en un mercado hostil.
                                </p>
                            </div>
                            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[
                                    { title: 'Simulacros de Ataque', desc: 'Aprende a defenderte de estafas en entornos controlados.' },
                                    { title: 'Auditoría On-Chain', desc: 'Analiza la salud de los protocolos antes de invertir.' },
                                    { title: 'Custodia Privada', desc: 'Configuración experta de hardware wallets y seguridad fría.' },
                                    { title: 'Psicología de Mercado', desc: 'Domina tus emociones bajo presión extrema.' }
                                ].map((step, i) => (
                                    <div key={i} className="p-8 bg-slate-900/40 border border-white/5 rounded-3xl hover:border-brand-500/20 transition-all">
                                        <div className="text-brand-500 font-black mb-4">0{i + 1} //</div>
                                        <h3 className="text-xl font-black text-white uppercase italic mb-2 tracking-tight">{step.title}</h3>
                                        <p className="text-slate-500 text-sm">{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pricing / Plans Section */}
                <section id="planes" className="py-32 px-4 bg-slate-900/20 border-t border-white/5">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-24">
                            <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic leading-none">
                                Planes de <span className="text-brand-500">Alto Rendimiento</span>
                            </h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                                Inversión única con acceso vitalicio a nuestra plataforma de inteligencia educativa.
                            </p>
                            {usdtPrice && (
                                <div className="mt-8 inline-block px-6 py-3 bg-brand-500/10 border border-brand-500/20 rounded-2xl">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-400">
                                        Cotización USDT: {formatCurrency(usdtPrice)}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                            {plans.map((plan) => (
                                <div
                                    key={plan.key}
                                    className={`relative bg-slate-900 border ${plan.popular ? 'border-brand-500 scale-105 shadow-[0_0_50px_rgba(34,197,94,0.15)]' : 'border-white/5'} rounded-[48px] p-12 transition-all hover:border-brand-500/30 overflow-hidden group`}
                                >
                                    {plan.popular && (
                                        <div className="absolute top-8 right-8">
                                            <div className="bg-brand-500 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full shadow-lg shadow-brand-500/40">Popular</div>
                                        </div>
                                    )}

                                    <div className="mb-12">
                                        <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4">Módulo de Formación</div>
                                        <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-8">{plan.name}</h3>

                                        <div className="flex items-baseline gap-2 mb-2">
                                            <span className="text-6xl font-black tracking-tighter">${plan.price.usd}</span>
                                            <span className="text-slate-600 font-black text-xs uppercase tracking-widest">USD</span>
                                        </div>
                                        {usdtPrice && (
                                            <div className="text-brand-500 font-bold uppercase text-[10px] tracking-widest">
                                                ≈ {formatCurrency(plan.price.usd * usdtPrice)} Final
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-5 mb-12">
                                        {plan.features.map((feat) => (
                                            <div key={feat} className="flex items-start gap-3">
                                                <div className="w-5 h-5 bg-brand-500/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check size={12} className="text-brand-500" />
                                                </div>
                                                <span className="text-sm text-slate-400 leading-tight">{feat}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <Link
                                        href={`/pago/${plan.key}`}
                                        className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all text-center block ${plan.popular
                                                ? 'bg-brand-500 text-white hover:bg-brand-400 shadow-xl shadow-brand-500/20'
                                                : 'border border-white/10 text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {plan.cta}
                                    </Link>

                                    <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                                        <Lock size={10} /> Pago Seguro SSL
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ High End */}
                <section className="py-32 px-4 bg-slate-950">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-4">Garantía de Excelencia</h2>
                            <p className="text-slate-500 uppercase tracking-widest text-[10px] font-black">Infraestructura Educativa Robusta</p>
                        </div>
                        <div className="space-y-6">
                            {[
                                { q: '¿Cuándo empieza el curso?', a: 'Acceso inmediato. El sistema procesa tu pago y te otorga credenciales automáticas en menos de 60 segundos.' },
                                { q: '¿Hay mentorías personalizadas?', a: 'Sí, los planes PRO y MASTER incluyen acceso a nuestro canal de soporte técnico prioritario para resolver dudas específicas.' },
                                { q: '¿Qué validez tiene el certificado?', a: 'Nuestros certificados están respaldados por CryptoAyuda Intelligence Lab y validan tus competencias técnicas en seguridad y operativa.' }
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-900/30 border border-white/5 p-10 rounded-[40px] hover:border-white/10 transition-all">
                                    <h4 className="text-lg font-black text-brand-400 uppercase italic mb-4">{item.q}</h4>
                                    <p className="text-slate-400 leading-relaxed text-sm">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
