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
    Terminal,
    X,
    ChevronRight,
    Play,
    Clock
} from 'lucide-react';

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [selectedLesson, setSelectedLesson] = useState<any>(null);
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
                { type: 'video', title: 'Historia y filosofía de Bitcoin', duration: '45 min', content: 'En esta lección exploramos los orígenes de Bitcoin tras la crisis de 2008, el Whitepaper de Satoshi Nakamoto y por qué la escasez digital cambió el mundo.' },
                { type: 'video', title: '¿Cómo funciona la Blockchain?', duration: '60 min', content: 'Análisis profundo de la cadena de bloques: nodos, minería, consenso y por qué es una base de datos inmutable e incorruptible.' },
                { type: 'text', title: 'Glosario Cripto Completo (A a la Z)', readTime: '30 min', content: 'Tu guía definitiva de términos: desde Altcoins y ATH hasta Whale y Zero-Knowledge Proofs.' },
                { type: 'checklist', title: 'Evaluación: Fundamentos', content: 'Verifica tus conocimientos antes de avanzar al módulo de compra segura.' }
            ]
        },
        {
            id: 'm2',
            title: 'Módulo 2: Comprar Cripto de Forma Segura',
            level: 'basic',
            description: 'Guía paso a paso para operar en exchanges sin cometer errores costosos.',
            items: [
                { type: 'video', title: 'Elegir el mejor Exchange en Latinoamérica', duration: '40 min', content: 'Comparativa de comisiones, seguridad y métodos de depósito/retiro para Argentina, México, Colombia y España.' },
                { type: 'video', title: 'Tu primer orden de compra (Limit vs Market)', duration: '50 min', content: 'Aprende a usar la interfaz de trading para no pagar de más por tus activos usando órdenes limitadas.' },
                { type: 'text', title: 'Cómo evitar errores en el envío de fondos', readTime: '20 min', content: 'El error más común es usar la red equivocada. Aquí te enseñamos a verificar cada paso para no perder tu dinero.' },
                { type: 'checklist', title: 'Checklist de Verificación de Redes', content: 'Una lista interactiva que debes seguir cada vez que realices un retiro de un exchange.' }
            ]
        },
        {
            id: 'm3',
            title: 'Módulo 3: Wallets y Custodia Personal',
            level: 'basic',
            description: 'El pilar de la libertad: cómo ser tu propio banco de forma segura.',
            items: [
                { type: 'video', title: 'Instalación y configuración de MetaMask', duration: '45 min', content: 'Guía práctica para configurar tu primera hot wallet y conectarte al ecosistema Web3 de forma segura.' },
                { type: 'video', title: 'Hardware Wallets: Ledger y Trezor', duration: '55 min', content: 'Por qué necesitas una "billetera fría" para tus ahorros a largo plazo y cómo configurarla desde cero.' },
                { type: 'text', title: 'Manejo Ético de Frases Semilla', readTime: '25 min', content: 'Tus 12 o 24 palabras son el acceso total a tu dinero. Aprende dónde y cómo guardarlas físicamente.' },
                { type: 'checklist', title: 'Tu plan de custodia 3-2-1', content: 'Diseña tu estrategia de seguridad: 3 copias, 2 formatos, 1 ubicación externa.' }
            ]
        },
        {
            id: 'm4',
            title: 'Módulo 4: Seguridad y Protección de Activos',
            level: 'advanced',
            description: 'Técnicas avanzadas para blindar tus cuentas y dispositivos contra ataques.',
            items: [
                { type: 'video', title: '2FA vs SMS: Por qué tu móvil es vulnerable', duration: '35 min', content: 'El Sim-Swapping es una amenaza real. Aprende a usar Google Authenticator o llaves físicas (Yubikey).' },
                { type: 'video', title: 'Firmas digitales y permisos de contratos', duration: '50 min', content: 'Cómo leer lo que firmas en MetaMask para no darle acceso a un hacker a drenar tu billetera.' },
                { type: 'text', title: 'Seguridad en el navegador y VPNs', readTime: '20 min', content: 'Blindaje de tu entorno de trabajo digital para evitar malware y keyloggers dirigidos.' },
                { type: 'checklist', title: 'Auditoría de seguridad personal', content: 'Completa este escaneo mensual de tus cuentas para mantenerte protegido.' }
            ]
        },
        {
            id: 'm5',
            title: 'Módulo 5: Detección y Prevención de Estafas',
            level: 'advanced',
            description: 'Anatomía forense de los fraudes más comunes para que nunca seas una víctima.',
            items: [
                { type: 'video', title: 'Detección de Esquemas Ponzi y Shuckers', duration: '60 min', content: 'Cómo identificar promesas de ganancias irreales y proyectos sin sustento tecnológico.' },
                { type: 'video', title: 'Ingeniería Social y Scamming en Telegram', duration: '45 min', content: 'Análisis de los métodos que usan los estafadores para ganarse tu confianza y robar tus datos.' },
                { type: 'text', title: 'Casos reales desglosados (Análisis Forense)', readTime: '40 min', content: 'Estudio de ataques famosos y cómo se podrían haber evitado con conocimiento básico.' },
                { type: 'checklist', title: 'Test de detección de señales rojas', content: 'Si el proyecto cumple más de 3 de estas señales, aléjate inmediatamente.' }
            ]
        },
        {
            id: 'm6',
            title: 'Módulo 6: Exchanges y Errores Frecuentes',
            level: 'advanced',
            description: 'Lo que los exchanges no te dicen sobre las comisiones y la seguridad de sus depósitos.',
            items: [
                { type: 'video', title: 'La cara oculta de los exchanges centralizados', duration: '50 min', content: 'Prueba de Reservas (PoR) y por qué "Not your keys, not your coins" debe ser tu mantra.' },
                { type: 'video', title: 'Resolución de bloques y retiros pendientes', duration: '40 min', content: 'Qué hacer cuando tu transacción se queda "pegada" y cómo contactar a soporte efectivamente.' },
                { type: 'text', title: 'Buenas prácticas y manejo de auditorías', readTime: '25 min', content: 'Cómo declarar tus movimientos y mantener una contabilidad saludable de tus activos.' },
                { type: 'checklist', title: 'Plan de acción ante bloqueos de cuenta', content: 'Protocolo paso a paso si pierdes acceso a tu exchange principal.' }
            ]
        },
        {
            id: 'm7',
            title: 'Módulo 7: Estrategias Profesionales de Largo Plazo',
            level: 'professional',
            description: 'Construcción de riqueza basada en fundamentales y ciclos de mercado.',
            items: [
                { type: 'video', title: 'Ciclos de Bitcoin y Halving Masterclass', duration: '90 min', content: 'Entiende la macroeconomía de Bitcoin y por qué los ciclos de 4 años son la base de la inversión inteligente.' },
                { type: 'video', title: 'Análisis de Proyectos (DYOR) Profesional', duration: '75 min', content: 'Framework de 10 puntos para evaluar si una Altcoin tiene futuro o es basura tecnológica.' },
                { type: 'text', title: 'Tesis de Inversión y Gestión de Portfolios', readTime: '45 min', content: 'Cómo diversificar sin diluir tus ganancias: la regla 70/20/10 para el éxito crypto.' },
                { type: 'checklist', title: 'Hoja de ruta 2025 - 2030', content: 'Tus objetivos financieros alineados con la maduración del ecosistema global.' }
            ]
        },
        {
            id: 'm8',
            title: 'Módulo 8: Guías Paso a Paso y Recursos',
            level: 'professional',
            description: 'Biblioteca avanzada de herramientas, scripts y plantillas operativas.',
            items: [
                { type: 'video', title: 'Automatización de alertas del mercado', duration: '50 min', content: 'Configura bots gratuitos para que te avisen cuando tus activos alcanzan precios clave.' },
                { type: 'text', title: 'Biblioteca de Recursos Descargables', readTime: 'Directo', content: 'Acceso a PDFs, plantillas de Excel para tracking y guías de configuración rápida.' },
                { type: 'text', title: 'Directorio de Herramientas de Auditoría', readTime: 'Directo', content: 'Los mejores sitios para verificar contratos inteligentes y rastrear movimientos de ballenas.' },
                { type: 'checklist', title: 'Resumen Mensual de Actualizaciones', content: 'Mantenente al día con los cambios técnicos mensuales seleccionados por nuestros expertos.' }
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
                                                            <div
                                                                key={itemIdx}
                                                                onClick={() => setSelectedLesson({ ...item, moduleTitle: mod.title })}
                                                                className="bg-slate-950/40 border border-white/5 p-6 rounded-3xl hover:border-brand-500/40 transition-all cursor-pointer group/item relative overflow-hidden active:scale-95"
                                                            >
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

            {/* Lesson Overlay / Modal */}
            {selectedLesson && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 animate-fade-in">
                    <div
                        className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
                        onClick={() => setSelectedLesson(null)}
                    />

                    <div className="relative w-full max-w-5xl bg-slate-900 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                        {/* Modal Header */}
                        <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-slate-900/50">
                            <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-brand-500 mb-1 block">
                                    {selectedLesson.moduleTitle}
                                </span>
                                <h2 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">
                                    {selectedLesson.title}
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedLesson(null)}
                                className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors border border-white/5"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-12">
                            {selectedLesson.type === 'video' ? (
                                <div className="space-y-8">
                                    {/* Video Placeholder */}
                                    <div className="aspect-video bg-slate-950 rounded-[32px] border border-white/5 relative group flex items-center justify-center overflow-hidden shadow-2xl">
                                        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/10 to-purple-500/10 opacity-50" />
                                        <div className="relative z-10 flex flex-col items-center gap-6">
                                            <div className="w-24 h-24 bg-brand-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-brand-500/40 group-hover:scale-110 transition-transform cursor-pointer">
                                                <Play size={40} fill="currentColor" />
                                            </div>
                                            <div className="text-center">
                                                <p className="font-black uppercase tracking-widest text-xs mb-2">Reproductor de Video Seguro</p>
                                                <p className="text-slate-500 text-[10px] font-medium uppercase tracking-tighter">Contenido exclusivo para alumnos de CryptoAyuda</p>
                                            </div>
                                        </div>
                                        {/* Fake Video UI */}
                                        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                                            <div className="h-1.5 w-full bg-white/10 rounded-full mb-6 relative overflow-hidden">
                                                <div className="absolute top-0 left-0 h-full w-1/3 bg-brand-500" />
                                            </div>
                                            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                                <span>00:00 / {selectedLesson.duration}</span>
                                                <span className="flex items-center gap-4">1080P HD <Maximize2 size={12} /></span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="max-w-3xl">
                                        <h3 className="text-lg font-bold mb-4 uppercase italic flex items-center gap-3">
                                            <FileText size={20} className="text-brand-400" /> Resumen de la Clase
                                        </h3>
                                        <p className="text-slate-400 leading-relaxed">
                                            {selectedLesson.content}
                                        </p>
                                        <div className="mt-8 p-6 bg-brand-500/5 border border-brand-500/10 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-brand-500/10 transition-all">
                                            <div className="flex items-center gap-4">
                                                <Download className="text-brand-400" size={24} />
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-widest">Guía PDF Complementaria</p>
                                                    <p className="text-[10px] text-slate-500">Documento de apoyo para esta lección (4.2 MB)</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={20} className="text-slate-700 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            ) : selectedLesson.type === 'text' ? (
                                <div className="max-w-3xl mx-auto py-8 prose prose-invert prose-brand">
                                    <div className="flex items-center gap-2 mb-8 bg-brand-500/10 w-fit px-4 py-1.5 rounded-full border border-brand-500/10">
                                        <Clock size={12} className="text-brand-400" />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-brand-400">Lectura Estimada: {selectedLesson.readTime}</span>
                                    </div>
                                    <h2 className="text-3xl font-black mb-10 tracking-tight">{selectedLesson.title}</h2>
                                    <p className="text-xl text-slate-300 leading-relaxed italic mb-12 border-l-4 border-brand-500 pl-6">
                                        {selectedLesson.content}
                                    </p>
                                    <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
                                        <p>En esta sección profundizamos en los conceptos clave que todo inversor debe dominar. La teoría es fundamental para no caer en las trampas psicológicas del mercado.</p>
                                        <h3 className="text-white font-bold uppercase mt-12 mb-4 tracking-wider">Puntos Clave del Capítulo</h3>
                                        <ul className="list-disc pl-6 space-y-4">
                                            <li>Definición y marco regulatorio actual.</li>
                                            <li>Impacto de la adopción institucional en la liquidez.</li>
                                            <li>Seguridad operativa y mejores prácticas de custodia.</li>
                                        </ul>
                                        <p className="mt-12 bg-slate-800/50 p-8 rounded-[32px] border border-white/5 flex items-start gap-4">
                                            <span className="text-4xl">💡</span>
                                            <span><strong>Pro Tip:</strong> Dedica al menos 20 minutos a analizar los gráficos y ejemplos citados antes de pasar a la siguiente lección.</span>
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="max-w-2xl mx-auto py-12 text-center">
                                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center text-green-400 mx-auto mb-8 border border-green-500/20">
                                        <ShieldCheck size={48} />
                                    </div>
                                    <h2 className="text-3xl font-black uppercase italic mb-4">Evaluación de Progreso</h2>
                                    <p className="text-slate-500 mb-12">Completa estas tareas para marcar el módulo como finalizado.</p>

                                    <div className="space-y-4 text-left mb-16">
                                        {[
                                            'He completado todas las lecturas del módulo.',
                                            'He configurado mi entorno de prueba según lo indicado.',
                                            'Comprendo los riesgos asociados a la lección actual.',
                                            'He descargado el material complementario.'
                                        ].map((check, i) => (
                                            <div key={i} className="flex items-center gap-4 bg-slate-950/50 p-6 rounded-2xl border border-white/5 hover:border-brand-500/30 transition-all cursor-pointer group">
                                                <div className="w-6 h-6 rounded border-2 border-slate-700 group-hover:border-brand-500 transition-colors" />
                                                <span className="text-slate-300 font-bold text-sm">{check}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setSelectedLesson(null)}
                                        className="w-full py-6 bg-brand-500 hover:bg-brand-400 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-xl shadow-brand-500/20"
                                    >
                                        FINALIZAR LECCIÓN
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-8 border-t border-white/5 bg-slate-950/50 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4 opacity-50">
                                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest">Capítulo Anterior</p>
                                    <p className="text-xs font-bold">Introducción al Ecosistema</p>
                                </div>
                            </div>
                            <button
                                className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 px-10 py-5 rounded-2xl border border-white/10 transition-all"
                                onClick={() => alert('¡Siguiente lección desbloqueada!')}
                            >
                                <div className="text-right">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-500">Siguiente</p>
                                    <p className="text-xs font-bold">Continuar con la formación</p>
                                </div>
                                <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
}

// Subcomponent for additional icons
function Maximize2({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
        </svg>
    )
}
