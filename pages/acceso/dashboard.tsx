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
    Crown
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
            title: 'Módulo 1: Introducción a Cripto',
            level: 'basic',
            items: [
                { type: 'video', title: '¿Qué es realmente Bitcoin?', duration: '15 min' },
                { type: 'text', title: 'Fundamentos de la Blockchain', readTime: '10 min' },
                { type: 'checklist', title: 'Tu primer mapa mental cripto' }
            ]
        },
        {
            id: 'm2',
            title: 'Módulo 2: Comprar de Forma Segura',
            level: 'basic',
            items: [
                { type: 'video', title: 'Elegir tu primer Exchange', duration: '20 min' },
                { type: 'text', title: 'KYC y Verificación sin riesgos', readTime: '8 min' },
                { type: 'checklist', title: 'Puntos de control antes de comprar' }
            ]
        },
        {
            id: 'm3',
            title: 'Módulo 3: Wallets y Custodia',
            level: 'basic',
            items: [
                { type: 'video', title: 'Hot vs Cold Wallets', duration: '25 min' },
                { type: 'text', title: 'Cómo guardar tu frase semilla', readTime: '12 min' },
                { type: 'checklist', title: 'Backup de seguridad 3-2-1' }
            ]
        },
        {
            id: 'm4',
            title: 'Módulo 4: Análisis de Estafas Reales',
            level: 'advanced',
            items: [
                { type: 'video', title: 'Ingeniería Social en Cripto', duration: '30 min' },
                { type: 'text', title: 'Anatomía de un Ponzi moderno', readTime: '15 min' },
                { type: 'checklist', title: 'Señales rojas inmediatas' }
            ]
        },
        {
            id: 'm5',
            title: 'Módulo 5: Gestión de Riesgo',
            level: 'advanced',
            items: [
                { type: 'video', title: 'Psicología del Inversor', duration: '22 min' },
                { type: 'text', title: 'Cómo armar un portfolio balanceado', readTime: '18 min' },
                { type: 'checklist', title: 'Cálculo de exposición máxima' }
            ]
        },
        {
            id: 'm6',
            title: 'Módulo 6: Estrategias Profesionales',
            level: 'professional',
            items: [
                { type: 'video', title: 'Inversión a Largo Plazo (DCA)', duration: '40 min' },
                { type: 'text', title: 'Ciclos de Mercado y Macroeconomía', readTime: '25 min' },
                { type: 'checklist', title: 'Plan de salida y toma de ganancias' }
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
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6 bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${user.plan === 'professional' ? 'bg-purple-500 text-white' :
                                        user.plan === 'advanced' ? 'bg-brand-500 text-white' :
                                            'bg-slate-700 text-slate-300'
                                    }`}>
                                    Plan {user.plan}
                                </span>
                                {user.plan === 'professional' && <Crown size={14} className="text-purple-400" />}
                            </div>
                            <h1 className="text-4xl font-black tracking-tighter uppercase italic mb-1">
                                Bienvenido, <span className="text-brand-400">{user.email.split('@')[0]}</span>
                            </h1>
                            <p className="text-slate-400 text-sm">Panel de Control Educativo • Academia Cripto Segura</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-red-400 transition-colors bg-white/5 px-6 py-3 rounded-xl border border-white/5"
                        >
                            <LogOut size={16} /> Cerrar Sesión
                        </button>
                    </div>

                    {/* Stats/Quick Access */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center text-brand-400">
                                <BookOpen size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Progreso</div>
                                <div className="text-xl font-bold">12% Completado</div>
                            </div>
                        </div>
                        <div className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                                <Zap size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Siguiente Paso</div>
                                <div className="text-xl font-bold italic uppercase">Módulo 1: Video 2</div>
                            </div>
                        </div>
                        <div className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                                <Shield size={24} />
                            </div>
                            <div>
                                <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Protección</div>
                                <div className="text-xl font-bold text-green-400 flex items-center gap-2">Activa <CheckCircle size={16} /></div>
                            </div>
                        </div>
                    </div>

                    {/* Modules Grid */}
                    <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                        <BookOpen className="text-brand-400" /> Plan de Formación
                    </h2>

                    <div className="space-y-8">
                        {modules.map((mod) => {
                            const accessible = hasAccess(mod.level);
                            return (
                                <div key={mod.id} className={`group bg-slate-900/20 border ${accessible ? 'border-white/5' : 'border-red-500/10 opacity-60'} rounded-3xl overflow-hidden transition-all`}>
                                    <div className="p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="flex gap-6 items-start">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${accessible ? 'bg-brand-500/10 text-brand-400' : 'bg-slate-800 text-slate-600'
                                                }`}>
                                                {!accessible ? <Lock size={24} /> : (
                                                    mod.id === 'm1' ? <BookOpen size={24} /> :
                                                        mod.id === 'm2' ? <TrendingUp size={24} /> :
                                                            mod.id === 'm3' ? <Wallet size={24} /> :
                                                                mod.id === 'm4' ? <AlertTriangle size={24} /> :
                                                                    mod.id === 'm5' ? <Shield size={24} /> :
                                                                        <Crown size={24} />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black uppercase italic tracking-tighter mb-2 group-hover:text-brand-400 transition-colors">
                                                    {mod.title}
                                                </h3>
                                                <p className="text-slate-500 text-sm max-w-xl">
                                                    Aprende los pilares fundamentales y las técnicas que utilizan los profesionales para navegar el mercado cripto.
                                                </p>
                                            </div>
                                        </div>

                                        {!accessible ? (
                                            <button
                                                className="bg-slate-800 text-slate-400 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest border border-white/5 cursor-not-allowed"
                                                disabled
                                            >
                                                Nivel {mod.level} Requerido
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-3">
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 px-3 py-1 bg-white/5 rounded-full border border-white/5">
                                                    3 Lecciones
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {accessible && (
                                        <div className="px-8 pb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {mod.items.map((item, idx) => (
                                                <div key={idx} className="bg-slate-950/50 border border-white/5 p-5 rounded-2xl hover:border-brand-500/30 transition-all cursor-pointer group/item">
                                                    <div className="flex items-center justify-between mb-4">
                                                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover/item:text-brand-400 group-hover/item:bg-brand-500/10 transition-all">
                                                            {item.type === 'video' ? <PlayCircle size={16} /> :
                                                                item.type === 'text' ? <FileText size={16} /> :
                                                                    <CheckCircle size={16} />}
                                                        </div>
                                                        <span className="text-[10px] font-bold text-slate-600 uppercase">
                                                            {(item as any).duration || (item as any).readTime || 'Directo'}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-sm font-bold text-slate-300 group-hover/item:text-white transition-colors">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            ))}
                                        </div>
                                    )}
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
