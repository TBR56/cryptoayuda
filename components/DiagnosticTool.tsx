import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, AlertTriangle, CheckCircle, Search, Mail, ArrowRight, Loader } from 'lucide-react';
import { EXCHANGES_LIST, PAISES, PROBLEMAS } from '../lib/data';

const steps = [
    'Selección',
    'Incidente',
    'Análisis',
    'Resultado',
    'Seguimiento'
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
            setTimeout(() => {
                setLoading(false);
                setStep(3);
                generateDiagnosis();
            }, 3000);
        }
    }, [step]);

    const generateDiagnosis = () => {
        const { problem, kycVerified } = selection;
        let diag = "";
        if (kycVerified === false) {
            diag = "Tu retiro está bloqueado principalmente por falta de verificación de identidad (KYC). El exchange requiere que valides tu documentación para liberar los fondos.";
        } else {
            diag = `Hemos detectado un bloqueo administrativo en ${selection.exchange}. Esto suele suceder por auditorías de seguridad de la red. No es un error de tu cuenta, sino una retención temporal.`;
        }
        setDiagnosis(diag);
    };

    const handleNext = () => setStep(step + 1);
    const handlePrev = () => setStep(step - 1);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent) return alert("Debes aceptar el consentimiento explícito");

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
            alert("Error de conexión con el servidor");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            {/* Stepper Header */}
            <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-slate-900/40">
                <div className="flex space-x-4">
                    {steps.map((s, i) => (
                        <div key={i} className="flex items-center space-x-2">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i <= step ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                                {i + 1}
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-widest hidden sm:inline ${i === step ? 'text-white' : 'text-slate-500'}`}>{s}</span>
                        </div>
                    ))}
                </div>
                <Shield className="text-brand-500 w-5 h-5 animate-pulse" />
            </div>

            <div className="p-10">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="step0"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <h2 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">Inicia tu Diagnóstico</h2>
                                <p className="text-slate-400">Selecciona el exchange y tu ubicación para un análisis preciso.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">Exchange / Wallet</label>
                                    <select
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-all cursor-pointer"
                                        value={selection.exchange}
                                        onChange={(e) => setSelection({ ...selection, exchange: e.target.value })}
                                    >
                                        <option value="">Seleccionar plataforma...</option>
                                        {EXCHANGES_LIST.map(ex => <option key={ex} value={ex}>{ex}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-slate-500 tracking-widest">País de Residencia</label>
                                    <select
                                        className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-white focus:border-brand-500 outline-none transition-all cursor-pointer"
                                        value={selection.country}
                                        onChange={(e) => setSelection({ ...selection, country: e.target.value })}
                                    >
                                        <option value="">Seleccionar país...</option>
                                        {PAISES.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                </div>
                            </div>
                            <button
                                disabled={!selection.exchange || !selection.country}
                                onClick={handleNext}
                                className="w-full bg-brand-600 hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black py-4 rounded-xl transition-all flex items-center justify-center space-x-2 shadow-lg shadow-brand-500/20"
                            >
                                <span>CONTINUAR</span>
                                <ArrowRight size={18} />
                            </button>
                        </motion.div>
                    )}

                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <h2 className="text-3xl font-black text-white mb-2 uppercase italic tracking-tighter">¿Cuál es el problema?</h2>
                                <p className="text-slate-400">Indícanos qué está sucediendo con tus fondos.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {PROBLEMAS.map((p) => (
                                    <button
                                        key={p.slug}
                                        onClick={() => setSelection({ ...selection, problem: p })}
                                        className={`text-left p-4 rounded-xl border transition-all ${selection.problem?.slug === p.slug ? 'bg-brand-500/10 border-brand-500 text-white shadow-brand-500/10 shadow-lg' : 'bg-slate-950/30 border-white/5 text-slate-400 hover:border-white/20'}`}
                                    >
                                        <div className="font-black text-sm uppercase tracking-wide">{p.title}</div>
                                        <div className={`text-[10px] mt-1 font-bold ${p.severity === 'Critica' ? 'text-red-400' : 'text-amber-400'}`}>Severidad: {p.severity}</div>
                                    </button>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                                <button onClick={handlePrev} className="py-4 rounded-xl border border-white/10 text-slate-500 font-bold hover:bg-white/5 transition-all">ATRÁS</button>
                                <button
                                    disabled={!selection.problem}
                                    onClick={handleNext}
                                    className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white font-black py-4 rounded-xl shadow-lg shadow-brand-500/20 transition-all"
                                >
                                    SIGUIENTE
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
                            className="py-16 flex flex-col items-center justify-center space-y-8"
                        >
                            <div className="relative">
                                <div className="w-24 h-24 border-4 border-brand-500/20 rounded-full border-t-brand-500 animate-spin" />
                                <Search className="absolute inset-0 m-auto text-brand-500 w-10 h-10" />
                            </div>
                            <div className="text-center animate-pulse">
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-widest">Ejecutando Análisis...</h3>
                                <p className="text-slate-500 text-sm mt-2">Consultando protocolos de seguridad en {selection.exchange}...</p>
                            </div>
                            <div className="w-full max-w-xs bg-slate-800 h-1.5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: 2.5 }}
                                    className="bg-brand-500 h-full shadow-[0_0_10px_#6366f1]"
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <div className="bg-brand-500/10 border border-brand-500/30 p-8 rounded-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <CheckCircle size={80} />
                                </div>
                                <div className="flex items-center space-x-3 text-brand-500 mb-4">
                                    <CheckCircle size={20} />
                                    <span className="font-black uppercase tracking-widest text-sm italic">Diagnóstico Completo</span>
                                </div>
                                <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">Resultado del Análisis</h2>
                                <div className="text-slate-300 leading-relaxed text-lg border-l-2 border-brand-500 pl-4">
                                    {diagnosis}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="text-center">
                                    <h4 className="text-lg font-black text-white uppercase tracking-tighter italic">¿Deseas la solución completa?</h4>
                                    <p className="text-slate-500 text-sm mt-1">Ingresa tu email para recibir la guía paso a paso y alertas de seguridad oficiales.</p>
                                </div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                        <input
                                            type="email"
                                            required
                                            placeholder="Tu email principal..."
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-slate-950/80 border border-white/10 rounded-2xl py-5 pl-12 pr-4 text-white focus:border-brand-500 outline-none transition-all placeholder:text-slate-600"
                                        />
                                    </div>
                                    <div className="flex items-start space-x-3 p-4 bg-slate-950/40 rounded-xl border border-white/5">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            checked={consent}
                                            onChange={(e) => setConsent(e.target.checked)}
                                            className="mt-1 w-4 h-4 rounded border-white/10 bg-slate-900 text-brand-600 focus:ring-brand-500"
                                        />
                                        <label htmlFor="consent" className="text-[11px] text-slate-400 leading-tight">
                                            Acepto recibir alertas de seguridad, diagnósticos y recursos educativos. Entiendo que puedo darme de baja en cualquier momento con un clic. <strong>Double Opt-In requerido.</strong>
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading || !consent}
                                        className="w-full bg-gradient-to-r from-brand-600 to-brand-500 text-white font-black py-5 rounded-2xl hover:scale-[1.02] transition-all shadow-xl shadow-brand-500/30 flex items-center justify-center space-x-3"
                                    >
                                        {loading ? <Loader className="animate-spin" /> : <>
                                            <span>OBTENER GUÍA Y ALERTAS</span>
                                            <ArrowRight size={20} />
                                        </>}
                                    </button>
                                    <p className="text-center text-[10px] text-slate-600 font-bold uppercase tracking-widest">🛡️ 100% SEGURO - SIN SPAM - CUMPLIMOS GDPR</p>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {step === 4 && (
                        <motion.div
                            key="step4"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-10 space-y-6"
                        >
                            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/10">
                                <CheckCircle className="text-green-500 w-10 h-10" />
                            </div>
                            <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">¡Casi listo!</h2>
                            <div className="max-w-md mx-auto space-y-4">
                                <p className="text-slate-300">Te enviamos un email de confirmación a <span className="text-brand-400 font-bold underline">{email}</span>.</p>
                                <div className="p-6 bg-slate-950/60 rounded-2xl border border-white/5 text-sm text-slate-500">
                                    <p className="mb-2 uppercase font-black tracking-widest text-[10px] text-brand-500 italic">Importante</p>
                                    Revisa tu bandeja de entrada (y la de correo no deseado) y **haz clic en el botón de confirmación** para activar las alertas y descargar tu guía de solución.
                                </div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="text-slate-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-all mt-8 block mx-auto underline"
                                >
                                    Realizar otro diagnóstico
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
