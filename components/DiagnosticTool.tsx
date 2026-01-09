import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Search, Mail, ArrowRight, Loader, Zap, Globe, Lock, ShieldCheck, ChevronDown, Activity, Terminal, ExternalLink, Info } from 'lucide-react';
import { EXCHANGES_LIST, PAISES, PROBLEMAS } from '../lib/data';

const steps = [
    'Configuración',
    'Incidente',
    'Análisis On-Chain',
    'Inteligencia',
    'Resolución'
];

export default function DiagnosticTool({ initialSelection }: { initialSelection?: any }) {
    const [step, setStep] = useState(initialSelection ? 3 : 0);
    const [loading, setLoading] = useState(false);
    const [selection, setSelection] = useState(initialSelection || {
        exchange: '',
        country: '',
        problem: null as any,
        kycVerified: null as boolean | null,
        fundsAmount: '',
    });
    const [diagnosis, setDiagnosis] = useState('');
    const [email, setEmail] = useState('');
    const [consent, setConsent] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (initialSelection) {
            generateDiagnosis();
        }
    }, [initialSelection]);

    // Progressive "Scanning" Effect
    useEffect(() => {
        if (step === 2) {
            setLoading(true);
            const timer = setTimeout(() => {
                setLoading(false);
                setStep(3);
                generateDiagnosis();
            }, 3500);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const generateDiagnosis = () => {
        const { problem, kycVerified, exchange } = selection;
        let diag = "";

        if (problem?.slug === 'cuenta-bloqueada') {
            diag = `Análisis prioritario para ${exchange}: Hemos detectado una discrepancia en los protocolos de verificación. Es altamente probable que el bloqueo se deba a una actualización en las políticas de cumplimiento (AML) locales.`;
        } else if (kycVerified === false) {
            diag = "Tu retiro está bloqueado principalmente por falta de verificación de identidad (KYC) nivel 2. El exchange requiere que valides tu documentación biométrica para liberar la restricción de salida.";
        } else {
            diag = `Protocolo de seguridad detectado en ${exchange}. Esto suele suceder por auditorías preventivas en la red blockchain seleccionada. Tus fondos están seguros pero requieren una validación manual de origen.`;
        }
        setDiagnosis(diag);
    };

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent) return;

        setLoading(true);
        try {
            const res = await fetch('/api/diagnose', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, selection }),
            });

            if (res.ok) {
                setSubmitted(true);
                setStep(4);
            } else {
                const err = await res.json();
                alert(`Error: ${err.message || 'No se pudo procesar la solicitud'}`);
            }
        } catch (error) {
            alert("Error de conexión con el servidor de inteligencia");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-slate-900/60 backdrop-blur-2xl border border-white/5 rounded-[40px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] relative">
            {/* Visual Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/5 blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/5 blur-[100px] -z-10" />

            {/* Stepper Header */}
            <div className="px-10 py-8 border-b border-white/5 flex flex-wrap justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
                    {steps.map((s, i) => (
                        <div key={i} className="flex items-center gap-3 shrink-0">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[11px] font-black transition-all duration-500 ${i <= step ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20 rotate-[360deg]' : 'bg-slate-800 text-slate-500'}`}>
                                {i + 1}
                            </div>
                            <span className={`text-[10px] font-black uppercase tracking-[0.2em] hidden sm:inline ${i === step ? 'text-white' : 'text-slate-600'}`}>{s}</span>
                            {i < steps.length - 1 && <div className="w-4 h-px bg-white/5 hidden md:block" />}
                        </div>
                    ))}
                </div>
                <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-brand-500/10 border border-brand-500/20 rounded-full">
                    <div className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-ping" />
                    <span className="text-[9px] font-black text-brand-400 uppercase tracking-widest">Secure Link Active</span>
                </div>
            </div>

            <div className="p-12 md:p-16">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="space-y-10"
                        >
                            <div className="text-center max-w-2xl mx-auto">
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter leading-[0.9]">
                                    Protocolo de <span className="text-brand-500">Diagnóstico</span>
                                </h2>
                                <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] opacity-60">
                                    Motor de Inteligencia Forense v4.0.2
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] pl-2 flex items-center gap-2">
                                        <Globe size={12} className="text-brand-500" /> Plataforma / Protocolo
                                    </label>
                                    <div className="relative group">
                                        <select
                                            className="w-full bg-slate-950/80 border border-white/5 rounded-3xl p-6 text-white focus:border-brand-500 outline-none transition-all cursor-pointer appearance-none shadow-2xl font-black uppercase tracking-widest text-xs"
                                            value={selection.exchange}
                                            onChange={(e) => setSelection({ ...selection, exchange: e.target.value })}
                                        >
                                            <option value="">Seleccionar plataforma...</option>
                                            {EXCHANGES_LIST.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 group-hover:text-brand-400 pointer-events-none transition-colors" size={16} />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] pl-2 flex items-center gap-2">
                                        <ShieldCheck size={12} className="text-brand-400" /> Jurisdicción Operativa
                                    </label>
                                    <div className="relative group">
                                        <select
                                            className="w-full bg-slate-950/80 border border-white/5 rounded-3xl p-6 text-white focus:border-brand-500 outline-none transition-all cursor-pointer appearance-none shadow-2xl font-black uppercase tracking-widest text-xs"
                                            value={selection.country}
                                            onChange={(e) => setSelection({ ...selection, country: e.target.value })}
                                        >
                                            <option value="">Seleccionar país...</option>
                                            {PAISES.map(p => <option key={p} value={p}>{p}</option>)}
                                        </select>
                                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-600 group-hover:text-brand-400 pointer-events-none transition-colors" size={16} />
                                    </div>
                                </div>
                            </div>
                            <button
                                disabled={!selection.exchange || !selection.country}
                                onClick={handleNext}
                                className="w-full relative group"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-white text-slate-950 disabled:opacity-50 disabled:cursor-not-allowed font-black py-8 rounded-3xl transition-all flex items-center justify-center gap-4 shadow-2xl uppercase tracking-[0.2em] text-xs">
                                    INICIAR ESCANEO DE SEGURIDAD <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                                </div>
                            </button>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            className="space-y-10"
                        >
                            <div className="text-center max-w-2xl mx-auto">
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">
                                    Naturaleza del <span className="text-brand-500">Evento</span>
                                </h2>
                                <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px]">Identificación de Vector de Riesgo</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-4 scrollbar-hide">
                                {PROBLEMAS.map((p) => (
                                    <button
                                        key={p.slug}
                                        onClick={() => setSelection({ ...selection, problem: p })}
                                        className={`group relative text-left p-8 rounded-[32px] border transition-all duration-500 ${selection.problem?.slug === p.slug ? 'bg-brand-500/10 border-brand-500 text-white shadow-[0_0_50px_rgba(99,102,241,0.2)] scale-[1.02]' : 'bg-slate-950/40 border-white/5 text-slate-500 hover:border-white/20 hover:bg-slate-900/40'}`}
                                    >
                                        <div className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 flex items-center gap-2 ${selection.problem?.slug === p.slug ? 'text-brand-400' : 'text-slate-600 group-hover:text-slate-400'}`}>
                                            <div className={`w-1.5 h-1.5 rounded-full ${p.severity === 'Critica' ? 'bg-red-500' : 'bg-amber-400'}`} />
                                            {p.severity} Priority
                                        </div>
                                        <div className="font-black text-lg uppercase tracking-tight italic mb-2 group-hover:text-white transition-colors">{p.title}</div>
                                        <div className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center gap-2">
                                            <Terminal size={10} /> HEX_{p.slug.slice(0, 8).toUpperCase()}
                                        </div>
                                        {selection.problem?.slug === p.slug && (
                                            <div className="absolute top-8 right-8 text-brand-500">
                                                <div className="w-8 h-8 rounded-full border-2 border-brand-500 flex items-center justify-center">
                                                    <CheckCircle size={16} />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="pt-10 border-t border-white/5 grid grid-cols-2 gap-6">
                                <button onClick={handlePrev} className="py-6 rounded-3xl border border-white/10 text-slate-500 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 hover:text-white transition-all">Regresar</button>
                                <button
                                    disabled={!selection.problem}
                                    onClick={handleNext}
                                    className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-black py-6 rounded-3xl shadow-2xl shadow-brand-500/20 transition-all uppercase tracking-widest text-[10px]"
                                >
                                    Confirmar Reporte Forense
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="py-20 flex flex-col items-center justify-center space-y-12"
                        >
                            <div className="relative">
                                <motion.div
                                    className="w-48 h-48 border-4 border-brand-500/10 rounded-full"
                                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.1, 0.3] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                />
                                <motion.div
                                    className="absolute inset-0 w-48 h-48 border-t-4 border-brand-500 rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Activity className="text-brand-500 w-16 h-16 animate-pulse" />
                                </div>
                            </div>
                            <div className="text-center space-y-6">
                                <h3 className="text-4xl font-black text-white uppercase italic tracking-tighter animate-pulse">
                                    Encriptando <span className="text-brand-500">Resultados</span>
                                </h3>
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3 justify-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
                                        <Terminal size={12} className="text-brand-400" /> Scanning Node Vectors...
                                    </div>
                                    <div className="flex items-center gap-3 justify-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                                        <Lock size={12} className="text-purple-400" /> Auditing Exchange Compliance...
                                    </div>
                                    <div className="flex items-center gap-3 justify-center text-[10px] font-black uppercase tracking-[0.4em] text-brand-500">
                                        <Shield size={12} className="animate-bounce" /> Securing Evidence Pipeline...
                                    </div>
                                </div>
                            </div>
                            <div className="w-full max-w-md bg-slate-950 border border-white/5 h-2 rounded-full overflow-hidden relative shadow-2xl">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 3.5, ease: "easeInOut" }}
                                    className="absolute inset-0 bg-gradient-to-r from-brand-600 via-purple-600 to-brand-400 shadow-[0_0_30px_rgba(99,102,241,0.5)]"
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-12"
                        >
                            <div className="bg-slate-950/60 border border-white/5 p-12 rounded-[50px] relative overflow-hidden group shadow-3xl">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/10 blur-[120px] -z-10 group-hover:bg-brand-500/20 transition-all duration-1000" />
                                <div className="flex items-center gap-4 text-brand-500 mb-10">
                                    <div className="p-3 bg-brand-500/10 rounded-2xl">
                                        <ShieldCheck size={28} className="animate-pulse" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-black uppercase tracking-[0.4em] text-[10px]">Intelligence Vector v4.0</span>
                                        <span className="text-slate-500 text-[9px] font-bold uppercase tracking-widest">Diagnostic Complete & Verified</span>
                                    </div>
                                </div>
                                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tighter italic leading-none">
                                    Vulnerabilidad <span className="text-brand-500">Activa</span>
                                </h2>
                                <div className="text-slate-200 leading-relaxed text-2xl font-black italic bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent border-l-4 border-brand-500 pl-10 py-4">
                                    {diagnosis}
                                </div>
                            </div>

                            <div className="space-y-12">
                                <div className="text-center">
                                    <h4 className="text-3xl font-black text-white uppercase tracking-tighter italic">Solicitud de Protocolo</h4>
                                    <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-4 flex items-center justify-center gap-3">
                                        <Lock size={12} className="text-brand-500" /> Transmisión Encriptada vía AES-256
                                    </p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="relative group">
                                        <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-brand-500 transition-colors" size={24} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="CORREO@ELECTRONICO.COM"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-slate-950/80 border border-white/10 rounded-[32px] py-8 pl-20 pr-8 text-white focus:border-brand-500 outline-none transition-all placeholder:text-slate-800 text-xl font-black tracking-widest shadow-3xl"
                                        />
                                    </div>
                                    <div className="flex items-start gap-6 p-8 bg-white/[0.02] rounded-[40px] border border-white/5 group hover:border-white/10 transition-all">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            checked={consent}
                                            onChange={(e) => setConsent(e.target.checked)}
                                            className="mt-1.5 w-6 h-6 rounded-xl border-white/10 bg-slate-950 text-brand-600 focus:ring-brand-500 transition-all cursor-pointer accent-brand-500"
                                        />
                                        <label htmlFor="consent" className="text-[11px] text-slate-400 leading-relaxed font-bold uppercase tracking-wide">
                                            Autorizo la activación del protocolo de <span className="text-brand-400">recuperación de fondos</span> y acepto los términos de la auditoría de seguridad. No se almacenan datos privados.
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading || !consent}
                                        className="w-full relative group h-24"
                                        style={{ display: loading ? 'none' : 'block' }}
                                    >
                                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-purple-600 rounded-[32px] blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                                        <div className="relative h-full bg-white text-slate-950 font-black rounded-[32px] transition-all flex items-center justify-center gap-4 text-sm tracking-[0.3em] uppercase">
                                            GENERAR SOLUCIÓN TÉCNICA <Zap size={22} fill="currentColor" />
                                        </div>
                                    </button>
                                    {loading && (
                                        <div className="w-full flex flex-col items-center justify-center py-12 gap-6">
                                            <Loader className="animate-spin text-brand-500" size={48} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 animate-pulse">Inyectando Protocolos...</span>
                                        </div>
                                    )}
                                    <div className="flex justify-center gap-10 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
                                        <div className="flex items-center gap-2"><Lock size={12} className="text-brand-500" /> SSL_SECURE</div>
                                        <div className="flex items-center gap-2"><Shield size={12} className="text-purple-500" /> PII_PROTECTED</div>
                                        <div className="flex items-center gap-2"><Globe size={12} className="text-brand-400" /> END_TO_END</div>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20 space-y-10"
                        >
                            <div className="relative w-32 h-32 mx-auto mb-12">
                                <motion.div
                                    className="absolute inset-0 bg-brand-500/20 rounded-full blur-2xl"
                                    animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0.1, 0.3] }}
                                    transition={{ repeat: Infinity, duration: 3 }}
                                />
                                <div className="relative w-32 h-32 bg-slate-950 border-2 border-brand-500 rounded-[40px] flex items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.3)] rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                    <ShieldCheck className="text-brand-500 w-16 h-16" />
                                </div>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter uppercase leading-[0.85] mb-8">
                                Transmisión <br /><span className="text-brand-500">Exitosa</span>
                            </h2>
                            <div className="max-w-xl mx-auto space-y-10">
                                <p className="text-slate-400 text-xl leading-relaxed font-medium">
                                    El vector de resolución ha sido inyectado y enviado a <span className="text-white font-black underline decoration-brand-500 decoration-4 underline-offset-8">{email}</span>.
                                </p>
                                <div className="p-10 bg-slate-950/80 rounded-[50px] border border-white/10 text-sm text-slate-300 leading-relaxed shadow-3xl text-left relative overflow-hidden group">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <Zap size={100} className="text-brand-400" />
                                    </div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                                        <p className="uppercase font-black tracking-[0.4em] text-[10px] text-brand-500 italic">Acción Inmediata Requerida</p>
                                    </div>
                                    <p className="text-lg font-bold leading-relaxed">
                                        Accede a tu terminal (bandeja de entrada) y localiza el reporte de <span className="text-white">CryptoAyuda Intelligence</span>. Debes validar tu identidad biométrica o documental para desencriptar los pasos técnicos.
                                    </p>
                                </div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="group flex items-center gap-4 mx-auto text-slate-500 hover:text-white transition-all py-4 px-8 rounded-full border border-white/5 hover:border-brand-500/30"
                                >
                                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Generar Nuevo Informe Técnico</span>
                                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
