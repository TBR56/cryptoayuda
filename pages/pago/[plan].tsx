import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCryptoPrice } from '../../hooks/useCryptoPrice';
import { Copy, Check, CreditCard, Wallet, AlertTriangle, ArrowRight, ShieldCheck, Upload } from 'lucide-react';
import { COURSES } from '../../lib/courseData';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const WALLET_ADDRESS_USDT = "0xf1f6033B91DA339b100118aB4493153b8dd67d8F";
const BANK_DETAILS = {
    titular: "TU NOMBRE O EMPRESA",
    cuit: "20-XXXXXXXX-X",
    alias: "CRYPTOAYUDA.OK",
    cvu: "000000XXXXXXXXXXXXXX",
    entidad: "Mercado Pago / Banco"
};

export default function PaymentPage() {
    const router = useRouter();
    const { plan } = router.query;
    const { price: usdtRate } = useCryptoPrice();

    // State
    const [method, setMethod] = useState<'transfer' | 'crypto'>('transfer');
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
    const [proof, setProof] = useState<string>(''); // Base64 of proof
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState<string | null>(null);

    // Plan Details
    const planKey = typeof plan === 'string' ? plan : 'base';
    const currentPlan = COURSES[planKey] || COURSES['base'];

    const arsPrice = currentPlan.price.ars;
    const usdPrice = currentPlan.price.usd;

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProof(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmitPayment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!proof) {
            alert('Por favor, sube una foto o captura de tu comprobante de pago.');
            return;
        }
        setLoading(true);

        try {
            const res = await fetch('/api/payments/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    plan: currentPlan.name,
                    amount: method === 'transfer' ? arsPrice : usdPrice,
                    method,
                    txHash: `manual_${Date.now()}`,
                    metadata: {
                        method,
                        proofBase64: proof.substring(0, 100) + '... [truncated]' // We'll send the full one in real app, but for log/db check we might need care
                    },
                    proofBase64: proof // Full proof for backend
                })
            });

            if (res.ok) {
                setStep(3);
            } else {
                const data = await res.json();
                alert(data.message || 'Error al procesar.');
            }
        } catch (err) {
            console.error(err);
            alert('Error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-brand-500/30">
            <Head>
                <title>Finalizar Inscripción | {currentPlan.name}</title>
            </Head>
            <Navbar />

            <main className="max-w-4xl mx-auto px-4 py-20">
                {/* Progress Steps */}
                <div className="flex justify-center mb-12">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-500'}`}>1</div>
                        <div className={`w-20 h-1 bg-slate-800 ${step >= 2 ? 'bg-brand-500' : ''}`} />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-500'}`}>2</div>
                        <div className={`w-20 h-1 bg-slate-800 ${step >= 3 ? 'bg-brand-500' : ''}`} />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-brand-500 text-white' : 'bg-slate-800 text-slate-500'}`}>3</div>
                    </div>
                </div>

                {step === 3 ? (
                    <div className="text-center animate-fade-in py-10">
                        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/50">
                            <ShieldCheck size={48} />
                        </div>
                        <h1 className="text-4xl font-black mb-4 uppercase italic">Comprobante Enviado</h1>
                        <p className="text-slate-400 max-w-lg mx-auto mb-8">
                            Hemos recibido tu comprobante de pago para el <span className="text-white font-bold">{currentPlan.name}</span>. <br /><br />
                            Nuestro equipo verificará la transferencia y activará tu cuenta en un plazo de **1 a 12 horas**. <br />
                            Recibirás tus credenciales en: <span className="text-brand-400 font-bold">{email}</span>.
                        </p>
                        <button onClick={() => router.push('/')} className="bg-slate-900 border border-white/10 hover:bg-slate-800 px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-colors">
                            Volver al Inicio
                        </button>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Summary Column */}
                        <div className="md:col-span-1">
                            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 sticky top-24">
                                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Resumen</h3>
                                <div className="space-y-4 mb-6 pb-6 border-b border-white/5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Programa Seleccionado</span>
                                        <span className="font-black text-sm">{currentPlan.name}</span>
                                    </div>
                                    <div className="flex justify-between items-end border-t border-white/5 pt-4">
                                        <span className="text-xs font-bold">Total a Pagar</span>
                                        <div className="text-right">
                                            <div className="text-2xl font-black text-brand-400">${arsPrice.toLocaleString('es-AR')}</div>
                                            <div className="text-[10px] text-slate-500 uppercase">Pesos Argentinos</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[10px] text-green-400/80">
                                        <Check size={10} /> Certificación Oficial
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px] text-green-400/80">
                                        <Check size={10} /> Acceso de por vida
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Column */}
                        <div className="md:col-span-2">
                            {step === 1 && (
                                <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8">
                                    <h2 className="text-2xl font-black mb-6 uppercase italic">tus datos de acceso</h2>
                                    <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-bold mb-2">Email del Alumno</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none transition-all"
                                                placeholder="tu@email.com"
                                            />
                                            <p className="text-[10px] text-slate-500 mt-2 uppercase font-bold">IMPORTANTE: Verificaremos tu pago usando este correo.</p>
                                        </div>
                                        <button type="submit" className="w-full bg-brand-500 hover:bg-brand-400 py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2">
                                            Continuar al Pago <ArrowRight size={18} />
                                        </button>
                                    </form>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6 animate-fade-in">
                                    {/* Method Selector */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setMethod('transfer')}
                                            className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${method === 'transfer' ? 'bg-brand-500/10 border-brand-500 text-white' : 'bg-slate-900 border-white/5 text-slate-500 hover:bg-slate-800'}`}
                                        >
                                            <CreditCard size={20} />
                                            <span className="font-bold text-[10px] uppercase">Transferencia Pesos</span>
                                        </button>
                                        <button
                                            onClick={() => setMethod('crypto')}
                                            className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${method === 'crypto' ? 'bg-orange-500/10 border-orange-500 text-white' : 'bg-slate-900 border-white/5 text-slate-500 hover:bg-slate-800'}`}
                                        >
                                            <Wallet size={20} />
                                            <span className="font-bold text-[10px] uppercase">USDT / Cripto</span>
                                        </button>
                                    </div>

                                    {method === 'transfer' ? (
                                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-8">
                                            <div>
                                                <h3 className="text-sm font-black uppercase mb-4 text-brand-400 tracking-widest">Datos para Transferir</h3>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                    <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 relative">
                                                        <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">Alias</p>
                                                        <p className="font-mono text-xs">{BANK_DETAILS.alias}</p>
                                                        <button onClick={() => handleCopy(BANK_DETAILS.alias, 'alias')} className="absolute top-4 right-4 text-brand-500 hover:text-brand-400">
                                                            {copied === 'alias' ? <Check size={14} /> : <Copy size={14} />}
                                                        </button>
                                                    </div>
                                                    <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5 relative">
                                                        <p className="text-[9px] text-slate-500 uppercase font-bold mb-1">CVU</p>
                                                        <p className="font-mono text-[10px]">{BANK_DETAILS.cvu}</p>
                                                        <button onClick={() => handleCopy(BANK_DETAILS.cvu, 'cvu')} className="absolute top-4 right-4 text-brand-500 hover:text-brand-400">
                                                            {copied === 'cvu' ? <Check size={14} /> : <Copy size={14} />}
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="mt-4 p-4 bg-slate-950/30 rounded-xl space-y-2">
                                                    <p className="text-xs"><strong>Titular:</strong> {BANK_DETAILS.titular}</p>
                                                    <p className="text-xs"><strong>CUIT:</strong> {BANK_DETAILS.cuit}</p>
                                                    <p className="text-xs"><strong>Entidad:</strong> {BANK_DETAILS.entidad}</p>
                                                </div>
                                            </div>

                                            <form onSubmit={handleSubmitPayment} className="space-y-6 pt-6 border-t border-white/5">
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase mb-4 tracking-widest text-slate-400">Sube tu Comprobante</label>
                                                    <div className="relative group">
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                            required
                                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                        />
                                                        <div className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all ${proof ? 'border-green-500/50 bg-green-500/5' : 'border-white/10 group-hover:border-brand-500/50 bg-slate-950'}`}>
                                                            {proof ? (
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-lg flex items-center justify-center">
                                                                        <Check size={24} />
                                                                    </div>
                                                                    <p className="text-xs font-bold text-green-500">Imagen cargada correctamente</p>
                                                                    <p className="text-[10px] text-slate-500">Haz clic para cambiarla</p>
                                                                </div>
                                                            ) : (
                                                                <div className="flex flex-col items-center gap-3">
                                                                    <div className="w-12 h-12 bg-slate-900 text-slate-500 rounded-lg flex items-center justify-center">
                                                                        <Upload size={24} />
                                                                    </div>
                                                                    <p className="text-xs font-bold">Haz clic o arrastra una imagen</p>
                                                                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">JPG, PNG o Screenshot</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <button disabled={loading || !proof} type="submit" className="w-full bg-brand-500 hover:bg-brand-400 py-4 rounded-xl font-bold uppercase tracking-widest transition-all disabled:opacity-50 shadow-xl shadow-brand-500/10">
                                                    {loading ? 'Enviando...' : 'He realizado la transferencia'}
                                                </button>
                                            </form>
                                        </div>
                                    ) : (
                                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 space-y-8">
                                            <div>
                                                <h3 className="text-sm font-black uppercase mb-4 text-orange-400 tracking-widest">Pago con Cripto</h3>
                                                <p className="text-xs text-slate-400 mb-6 leading-relaxed">Envía el monto exacto en USDT o USDC (Red BNB Smart Chain) a la dirección debajo y sube el comprobante.</p>

                                                <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 relative text-center">
                                                    <p className="text-[9px] text-slate-500 uppercase font-bold mb-2">Dirección USDT (BNB Chain)</p>
                                                    <p className="font-mono text-xs break-all mb-4 px-4">{WALLET_ADDRESS_USDT}</p>
                                                    <button onClick={() => handleCopy(WALLET_ADDRESS_USDT, 'usdt')} className="flex items-center gap-2 mx-auto text-orange-400 font-bold text-[10px] hover:text-orange-300">
                                                        {copied === 'usdt' ? <Check size={12} /> : <Copy size={12} />}
                                                        {copied === 'usdt' ? 'Copiado' : 'Copiar Wallet'}
                                                    </button>
                                                </div>
                                            </div>

                                            <form onSubmit={handleSubmitPayment} className="space-y-6 pt-6 border-t border-white/5">
                                                <div>
                                                    <label className="block text-[10px] font-black uppercase mb-4 tracking-widest text-slate-400">Captura de la Transacción</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                        required
                                                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-xs"
                                                    />
                                                </div>
                                                <button disabled={loading || !proof} type="submit" className="w-full bg-orange-500 hover:bg-orange-400 py-4 rounded-xl font-bold uppercase tracking-widest transition-all disabled:opacity-50">
                                                    {loading ? 'Verificando...' : 'He realizado el envío'}
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}

