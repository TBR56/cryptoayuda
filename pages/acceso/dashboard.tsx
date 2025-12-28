import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import {
    BookOpen,
    Shield,
    Wallet,
    AlertTriangle,
    CheckCircle,
    PlayCircle,
    FileText,
    Lock,
    LogOut,
    TrendingUp,
    Zap,
    Crown,
    ShieldCheck,
    MessageSquare,
    Download,
    Terminal
} from 'lucide-react';

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('premium_user');
        if (!storedUser) {
            router.push('/acceso/login');
        } else {
            setUser(JSON.parse(storedUser));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('premium_user');
        router.push('/acceso/login');
    };

    if (!user) return null;

    const modules = [
        {
            id: 'm1',
            title: 'Módulo 1: Introducción a las Criptomonedas',
            level: 'basic',
            description: 'Conceptos fundamentales, historia de Bitcoin y el ecosistema financiero actual.',
            items: [
                { type: 'video', title: 'Historia y filosofía de Bitcoin', duration: '45 min' },
                { type: 'video', title: '¿Cómo funciona la Blockchain?', duration: '60 min' },
                { type: 'text', title: 'Glosario Cripto Completo (A a la Z)', readTime: '30 min' },
                { type: 'checklist', title: 'Evaluación: Fundamentos' }
            ]
        },
        {
            id: 'm2',
            title: 'Módulo 2: Comprar Cripto de Forma Segura',
            level: 'basic',
            description: 'Guía paso a paso para operar en exchanges sin cometer errores costosos.',
            items: [
                { type: 'video', title: 'Elegir el mejor Exchange en Latinoamérica', duration: '40 min' },
                { type: 'video', title: 'Tu primer orden de compra (Limit vs Market)', duration: '50 min' },
                { type: 'text', title: 'Cómo evitar errores en el envío de fondos', readTime: '20 min' },
                { type: 'checklist', title: 'Checklist de Verificación de Redes' }
            ]
        },
        {
            id: 'm3',
            title: 'Módulo 3: Wallets y Custodia Personal',
            level: 'basic',
            description: 'El pilar de la libertad: cómo ser tu propio banco de forma segura.',
            items: [
                { type: 'video', title: 'Instalación y configuración de MetaMask', duration: '45 min' },
                { type: 'video', title: 'Hardware Wallets: Ledger y Trezor', duration: '55 min' },
                { type: 'text', title: 'Manejo Ético de Frases Semilla', readTime: '25 min' },
                { type: 'checklist', title: 'Tu plan de custodia 3-2-1' }
            ]
        },
        {
            id: 'm4',
            title: 'Módulo 4: Seguridad y Protección de Activos',
            level: 'advanced',
            description: 'Técnicas avanzadas para blindar tus cuentas y dispositivos contra ataques.',
            items: [
                { type: 'video', title: '2FA vs SMS: Por qué tu móvil es vulnerable', duration: '35 min' },
                { type: 'video', title: 'Firmas digitales y permisos de contratos', duration: '50 min' },
                { type: 'text', title: 'Seguridad en el navegador y VPNs', readTime: '20 min' },
                { type: 'checklist', title: 'Auditoría de seguridad personal' }
            ]
        },
        {
            id: 'm5',
            title: 'Módulo 5: Detección y Prevención de Estafas',
            level: 'advanced',
            description: 'Anatomía forense de los fraudes más comunes para que nunca seas una víctima.',
            items: [
                { type: 'video', title: 'Detección de Esquemas Ponzi y Shuckers', duration: '60 min' },
                { type: 'video', title: 'Ingeniería Social y Scamming en Telegram', duration: '45 min' },
                { type: 'text', title: 'Casos reales desglosados (Análisis Forense)', readTime: '40 min' },
                { type: 'checklist', title: 'Test de detección de señales rojas' }
            ]
        },
        {
            id: 'm6',
            title: 'Módulo 6: Exchanges y Errores Frecuentes',
            level: 'advanced',
            description: 'Lo que los exchanges no te dicen sobre las comisiones y la seguridad de sus depósitos.',
            items: [
                { type: 'video', title: 'La cara oculta de los exchanges centralizados', duration: '50 min' },
                { type: 'video', title: 'Resolución de bloques y retiros pendientes', duration: '40 min' },
                { type: 'text', title: 'Buenas prácticas y manejo de auditorías', readTime: '25 min' },
                { type: 'checklist', title: 'Plan de acción ante bloqueos de cuenta' }
            ]
        },
        {
            id: 'm7',
            title: 'Módulo 7: Estrategias Profesionales de Largo Plazo',
            level: 'professional',
            description: 'Construcción de riqueza basada en fundamentales y ciclos de mercado.',
            items: [
                { type: 'video', title: 'Ciclos de Bitcoin y Halving Masterclass', duration: '90 min' },
                { type: 'video', title: 'Análisis de Proyectos (DYOR) Profesional', duration: '75 min' },
                { type: 'text', title: 'Tesis de Inversión y Gestión de Portfolios', readTime: '45 min' },
                { type: 'checklist', title: 'Hoja de ruta 2025 - 2030' }
            ]
        },
        {
            id: 'm8',
            title: 'Módulo 8: Guías Paso a Paso y Recursos',
            level: 'professional',
            description: 'Biblioteca avanzada de herramientas, scripts y plantillas operativas.',
            items: [
                { type: 'video', title: 'Automatización de alertas del mercado', duration: '50 min' },
                { type: 'text', title: 'Biblioteca de Recursos Descargables', readTime: 'Directo' },
                { type: 'text', title: 'Directorio de Herramientas de Auditoría', readTime: 'Directo' },
                { type: 'checklist', title: 'Resumen Mensual de Actualizaciones' }
            ]
        }
    ];

    const hasAccess = (moduleLevel: string) => {
        if (user.plan === 'professional') return true;
        if (user.plan === 'advanced' && (moduleLevel === 'basic' || moduleLevel === 'advanced')) return true;
        if (user.plan === 'basic' && moduleLevel === 'basic') return true;
        return false;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
            <Head>
                <title>Panel de Miembro | Academia Cripto Segura</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <Navbar />

            <main className="pt-32 pb-20 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-8 bg-slate-900/40 p-8 md:p-12 rounded-[40px] border border-white/5 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 p-12 text-brand-500/5 -rotate-12 select-none">
                            <ShieldCheck size={280} />
                        </div>

                        <div className="relative">
                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg ${user.plan === 'professional' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-purple-500/20' :
                                    user.plan === 'advanced' ? 'bg-gradient-to-r from-brand-500 to-blue-600 text-white shadow-brand-500/20' :
                                        'bg-slate-700 text-slate-300'
                                    }`}>
                                    Plan {user.plan}
                                </span>
                                {user.plan === 'professional' && <Crown size={16} className="text-yellow-500 animate-pulse" />}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic mb-2 leading-none">
                                Bienvenido, <span className="text-brand-400">{user.email.split('@')[0]}</span>
                            </h1>
                            <p className="text-slate-400 text-sm font-medium tracking-wide">Panel de Formación Exclusivo • Academia Cripto Segura</p>
                        </div>
                        <div className="flex flex-wrap gap-4 relative">
                            <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white bg-white/5 px-8 py-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                                <MessageSquare size={18} className="text-brand-400" /> Soporte Alumno
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center justify-center w-14 h-14 rounded-2xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all"
                                title="Cerrar Sesión"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Dashboard Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
                        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl group hover:border-brand-500/20 transition-all">
                            <div className="w-12 h-12 bg-brand-500/10 rounded-2xl flex items-center justify-center text-brand-400 mb-6 group-hover:scale-110 transition-transform">
                                <Zap size={24} />
                            </div>
                            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Racha de Estudio</div>
                            <div className="text-2xl font-black italic uppercase">4 Días</div>
                        </div>
                        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl group hover:border-brand-500/20 transition-all">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                <Clock size={24} />
                            </div>
                            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Tiempo Total</div>
                            <div className="text-2xl font-black italic uppercase">12.5 Horas</div>
                        </div>
                        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl group hover:border-brand-500/20 transition-all">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                <CheckCircle size={24} />
                            </div>
                            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Completado</div>
                            <div className="text-2xl font-black italic uppercase">18%</div>
                        </div>
                        <div className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl group hover:border-brand-500/20 transition-all">
                            <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                                <Download size={24} />
                            </div>
                            <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Recursos</div>
                            <div className="text-2xl font-black italic uppercase">12 PDF</div>
                        </div>
                    </div>

                    {/* Modules List */}
                    <div className="mb-12 flex items-center justify-between">
                        <h2 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-4">
                            <BookOpen className="text-brand-500" size={32} /> Plan Curricular
                        </h2>
                        <span className="text-slate-600 text-xs font-bold uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                            8 Módulos Totales
                        </span>
                    </div>

                    <div className="space-y-10">
                        {modules.map((mod, modIdx) => {
                            const accessible = hasAccess(mod.level);
                            return (
                                <div key={mod.id} className={`group relative bg-slate-900/20 border ${accessible ? 'border-white/5' : 'border-red-500/10 opacity-70'} rounded-[40px] overflow-hidden transition-all duration-500 ${accessible ? 'hover:bg-slate-900/30 hover:border-white/10' : ''}`}>
                                    <div className="p-8 md:p-12">
                                        <div className="flex flex-col md:flex-row gap-8 items-start">
                                            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 shadow-lg ${accessible ? 'bg-brand-500/10 text-brand-500 border border-brand-500/20' : 'bg-slate-800 text-slate-600 border border-white/5'
                                                }`}>
                                                {!accessible ? <Lock size={32} /> : (
                                                    modIdx === 0 ? <BookOpen size={32} /> :
                                                        modIdx === 1 ? <TrendingUp size={32} /> :
                                                            modIdx === 2 ? <Wallet size={32} /> :
                                                                modIdx === 3 ? <Shield size={32} /> :
                                                                    modIdx === 4 ? <AlertTriangle size={32} /> :
                                                                        modIdx === 5 ? <Terminal size={32} /> :
                                                                            modIdx === 6 ? <Crown size={32} /> :
                                                                                <Download size={32} />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-4 mb-3">
                                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter leading-none group-hover:text-brand-400 transition-colors">
                                                        {mod.title}
                                                    </h3>
                                                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${mod.level === 'professional' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                                                        mod.level === 'advanced' ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' :
                                                            'bg-slate-800 text-slate-500 border border-white/5'
                                                        }`}>
                                                        {mod.level}
                                                    </span>
                                                </div>
                                                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mb-8">
                                                    {mod.description}
                                                </p>

                                                {!accessible ? (
                                                    <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl flex items-center justify-between">
                                                        <div>
                                                            <p className="text-red-400 text-xs font-black uppercase tracking-widest mb-1">Acceso Denegado</p>
                                                            <p className="text-slate-500 text-[10px] font-medium leading-tight max-w-[280px]">Este contenido requiere una suscripción de nivel superior. Mejora tu plan para desbloquear estas {mod.items.length} lecciones.</p>
                                                        </div>
                                                        <button className="bg-slate-800 text-slate-400 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/5 hover:bg-slate-700 transition-colors">Upgrade</button>
                                                    </div>
                                                ) : (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                                        {mod.items.map((item, itemIdx) => (
                                                            <div key={itemIdx} className="bg-slate-950/40 border border-white/5 p-6 rounded-3xl hover:border-brand-500/40 transition-all cursor-pointer group/item relative overflow-hidden active:scale-95">
                                                                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover/item:opacity-20 transition-opacity">
                                                                    {item.type === 'video' ? <PlayCircle size={40} /> : <FileText size={40} />}
                                                                </div>
                                                                <div className="relative">
                                                                    <div className="flex items-center justify-between mb-4">
                                                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-500 group-hover/item:text-brand-500 group-hover/item:bg-brand-500/10 transition-all">
                                                                            {item.type === 'video' ? <PlayCircle size={20} /> :
                                                                                item.type === 'text' ? <FileText size={20} /> :
                                                                                    <CheckCircle size={20} />}
                                                                        </div>
                                                                        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                                                                            {(item as any).duration || (item as any).readTime}
                                                                        </span>
                                                                    </div>
                                                                    <h4 className="text-xs font-bold text-slate-300 leading-snug group-hover/item:text-white transition-colors pr-4">
                                                                        {item.title}
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
