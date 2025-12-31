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
    Play
} from 'lucide-react';

import { useCryptoPrice } from '../hooks/useCryptoPrice';

export default function AcademiaLanding() {
    const { price: usdtPrice, loading: loadingPrice } = useCryptoPrice();

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
            cta: 'Carrera Profesional'
        }
    ];

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);
    };



    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
            <Head>
                <title>Academia Cripto Segura | Formación Profesional desde Cero</title>
                <meta name="description" content="Aprende criptomonedas de forma segura. Curso desde cero para evitar estafas, proteger tus activos y entender el mercado financiero del futuro." />
                <meta name="keywords" content="curso criptomonedas desde cero, aprender criptomonedas seguro, como evitar estafas cripto, academia crypto argentina" />
            </Head>

            <Navbar />
            <PriceTicker />

            <main>
                {/* Hero Section */}
                <section className="relative pt-40 pb-24 px-4 overflow-hidden">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-500/10 blur-[150px] rounded-full -z-10" />

                    <div className="max-w-6xl mx-auto text-center">
                        <div className="inline-flex items-center gap-2 bg-brand-500/10 text-brand-400 px-6 py-2 rounded-full border border-brand-500/20 mb-8 animate-fade-in">
                            <Zap size={16} /> <span className="text-xs font-black uppercase tracking-widest">Inscripciones Abiertas 2025</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase italic leading-[1.1]">
                            Domina el Mundo Cripto <br />
                            <span className="text-brand-500">Sin Correr Riesgos</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                            La educación es tu mayor protección. Aprende a operar, almacenar y entender las criptomonedas con nuestra formación profesional diseñada para tu seguridad financiera.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <a href="#planes" className="bg-brand-500 hover:bg-brand-400 text-white font-black px-12 py-6 rounded-2xl text-xl transition-all shadow-xl shadow-brand-500/20 transform hover:-translate-y-1 flex items-center gap-3">
                                VER PLANES DE ESTUDIO <ArrowRight size={24} />
                            </a>
                            <Link href="/acceso/login" className="text-slate-500 hover:text-white font-bold uppercase tracking-widest text-sm transition-colors border-b-2 border-transparent hover:border-brand-500 pb-1">
                                Ya soy alumno →
                            </Link>
                        </div>

                        {/* Social Proof */}
                        <div className="mt-20 flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="flex items-center gap-3">
                                    <ShieldCheck size={24} />
                                    <span className="font-black uppercase tracking-tighter text-xl">Certificado {i}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-24 px-4 bg-slate-900/20 border-y border-white/5">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-400 mx-auto mb-6">
                                <BookOpen size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 uppercase italic">Contenido Actualizado</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Módulos renovados mensualmente para seguir el ritmo veloz del ecosistema blockchain.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mx-auto mb-6">
                                <Clock size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 uppercase italic">A Tu Propio Ritmo</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Sin horarios ni prisas. Accede de por vida a tu material de estudio desde cualquier dispositivo.</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mx-auto mb-6">
                                <Users size={32} />
                            </div>
                            <h3 className="text-xl font-bold mb-4 uppercase italic">Enfoque Realista</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">Sin falsas promesas. Educación pura para que tomes tus propias decisiones con conocimiento.</p>
                        </div>
                    </div>
                </section>

                {/* Pricing Section */}
                <section id="planes" className="py-32 px-4 relative">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">
                                Elige tu <span className="text-brand-500">Nivel de Formación</span>
                            </h2>
                            <p className="text-slate-400 max-w-2xl mx-auto">
                                Selecciona el plan que mejor se adapte a tus objetivos actuales. Todos incluyen acceso instantáneo tras el pago.
                            </p>
                            <div className="mt-4 inline-block px-4 py-2 bg-slate-800 rounded-full text-xs font-bold text-slate-300 border border-slate-700">
                                Cotización Dólar Crypto: {usdtPrice ? formatCurrency(usdtPrice) : 'Cargando...'}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {plans.map((plan) => (
                                <div key={plan.name} className={`relative group bg-slate-900/40 border ${plan.popular ? 'border-brand-500' : 'border-white/5'} rounded-[40px] p-10 backdrop-blur-sm transition-all hover:translate-y-[-10px] shadow-2xl overflow-hidden`}>
                                    {plan.popular && (
                                        <div className="absolute top-0 right-0 bg-brand-500 text-white text-[10px] font-black uppercase tracking-widest px-8 py-2 rotate-45 translate-x-8 translate-y-4">
                                            Recomendado
                                        </div>
                                    )}

                                    <div className="mb-8">
                                        <h3 className="text-2xl font-black uppercase italic tracking-tighter mb-2">{plan.name}</h3>
                                        <div className="flex flex-col">
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-5xl font-black tracking-tighter">${plan.price.usd}</span>
                                                <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">USD</span>
                                            </div>
                                            <div className="text-sm font-bold text-brand-400 mt-1">
                                                ≈ {usdtPrice ? formatCurrency(plan.price.usd * usdtPrice) : '...'} ARS
                                            </div>
                                        </div>
                                        <p className="text-slate-500 text-xs mt-4 flex items-center gap-2">
                                            <Clock size={12} /> {plan.totalHours}
                                        </p>
                                    </div>

                                    <ul className="space-y-4 mb-10">
                                        {plan.features.map((feat) => (
                                            <li key={feat} className="flex items-start gap-3 group/item">
                                                <div className="mt-1 w-5 h-5 rounded-full bg-brand-500/10 text-brand-500 flex items-center justify-center shrink-0">
                                                    <Check size={12} />
                                                </div>
                                                <span className="text-sm text-slate-400 group-hover/item:text-white transition-colors">
                                                    {feat}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href={`/pago/${plan.key}`}
                                        className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl block text-center ${plan.popular
                                            ? 'bg-brand-500 hover:bg-brand-400 text-white shadow-brand-500/20'
                                            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                                            }`}
                                    >
                                        {plan.cta}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ Preview */}
                <section className="py-24 px-4 bg-slate-900/10 border-t border-white/5">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-black uppercase mb-12 italic">Preguntas Frecuentes</h2>
                        <div className="space-y-8 text-left">
                            <div className="bg-slate-900/30 p-8 rounded-3xl border border-white/5 transition-all hover:border-white/10">
                                <h4 className="text-lg font-bold mb-3 uppercase tracking-tight text-brand-400 italic">¿Cómo recibo mis datos de acceso?</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    El sistema es 100% automático. Una vez verificado el pago, recibirás un email de bienvenida con tu usuario y contraseña temporal al instante.
                                </p>
                            </div>
                            <div className="bg-slate-900/30 p-8 rounded-3xl border border-white/5 transition-all hover:border-white/10">
                                <h4 className="text-lg font-bold mb-3 uppercase tracking-tight text-brand-400 italic">¿Necesito conocimientos previos?</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    No. El Plan Básico está diseñado para empezar desde cero absoluto, guiándote paso a paso por la interfaz de los exchanges y las billeteras.
                                </p>
                            </div>
                            <div className="bg-slate-900/30 p-8 rounded-3xl border border-white/5 transition-all hover:border-white/10">
                                <h4 className="text-lg font-bold mb-3 uppercase tracking-tight text-brand-400 italic">¿El pago es por única vez?</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    Sí. Pagas una única vez y tienes acceso ilimitado de por vida al contenido de tu plan y todas sus actualizaciones futuras.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
