import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCryptoPrice } from '../../hooks/useCryptoPrice';
import { Copy, Check, CreditCard, Wallet, AlertTriangle, ArrowRight, ShieldCheck, Upload } from 'lucide-react';
import { COURSES } from '../../lib/courseData';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const WALLET_ADDRESS = "0xf1f6033B91DA339b100118aB4493153b8dd67d8F";

const NETWORKS = [
    { name: 'Ethereum', color: 'bg-blue-600', coins: ['ETH', 'USDT', 'USDC'] },
    { name: 'BNB Chain', color: 'bg-yellow-500', coins: ['BNB', 'USDT', 'USDC'] },
    { name: 'Polygon', color: 'bg-purple-600', coins: ['MATIC', 'USDT', 'USDC'] },
    { name: 'Arbitrum', color: 'bg-blue-400', coins: ['ETH', 'USDT', 'USDC'] },
    { name: 'Optimism', color: 'bg-red-500', coins: ['ETH', 'USDT', 'USDC'] },
    { name: 'Base', color: 'bg-blue-500', coins: ['ETH', 'USDC'] },
];

export default function PaymentPage() {
    const router = useRouter();
    const { plan } = router.query;
    const { price: usdtPrice } = useCryptoPrice();

    // State
    const [method, setMethod] = useState<'crypto' | 'paypal'>('paypal');
    const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[1]); // Default BNB (Low fees)
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
    const [txHash, setTxHash] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // Plan Details (Dynamic from source of truth)
    const planKey = typeof plan === 'string' ? plan : 'base';
    const currentPlan = COURSES[planKey] || COURSES['base'];

    // Safety check for price access
    const usdPrice = currentPlan.price ? currentPlan.price.usd : 0;
    const arsAmount = usdtPrice ? Math.ceil(usdPrice * usdtPrice) : null;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmitCrypto = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/payments/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    plan: currentPlan.name,
                    amount: usdPrice,
                    method: 'crypto',
                    txHash,
                    metadata: { network: selectedNetwork.name }
                })
            });

            if (res.ok) {
                setStep(3);
            } else {
                alert('Hubo un error al procesar tu solicitud. Intenta nuevamente.');
            }
        } catch (err) {
            console.error(err);
            alert('Error de conexión.');
        } finally {
            setLoading(false);
        }
    };

    const handlePayPalSuccess = async (details: any) => {
        setLoading(true);
        try {
            const res = await fetch('/api/payments/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    plan: currentPlan.name,
                    amount: usdPrice,
                    method: 'paypal',
                    txHash: details.id, // Use PayPal order ID
                    metadata: { paypalDetails: details }
                })
            });

            if (res.ok) {
                setStep(3);
            }
        } catch (err) {
            console.error("PayPal Submission Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <PayPalScriptProvider options={{ "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "sb" }}>
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
                        <div className="text-center animate-fade-in">
                            <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                                <ShieldCheck size={48} />
                            </div>
                            <h1 className="text-4xl font-black mb-4 uppercase italic">¡Inscripción Exitosa!</h1>
                            <p className="text-slate-400 max-w-lg mx-auto mb-8">
                                Tu pago ha sido procesado correctamente. <br /><br />
                                Recibirás tus credenciales de acceso en: <span className="text-white font-bold">{email}</span>. Revisa también tu carpeta de Spam.
                            </p>
                            <button onClick={() => router.push('/acceso/login')} className="bg-brand-500 hover:bg-brand-400 px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-colors">
                                Ir al Login
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Summary Column */}
                            <div className="md:col-span-1">
                                <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 sticky top-24">
                                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Resumen</h3>
                                    <div className="space-y-4 mb-6 pb-6 border-b border-white/5">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="font-bold">{currentPlan.name}</span>
                                            <span className="text-brand-400 font-bold">${usdPrice} USD</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[10px] text-slate-500">
                                            <span>Referencia ARS</span>
                                            <span>≈ {arsAmount ? `$${arsAmount.toLocaleString('es-AR')}` : '...'}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-[10px] text-green-400">
                                            <Check size={10} /> Acceso Inmediato
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-green-400">
                                            <Check size={10} /> Soporte 24/7
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Column */}
                            <div className="md:col-span-2">
                                {step === 1 && (
                                    <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8">
                                        <h2 className="text-2xl font-black mb-6 uppercase italic">tus datos</h2>
                                        <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-bold mb-2">Email de acceso</label>
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={e => setEmail(e.target.value)}
                                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none"
                                                    placeholder="tu@email.com"
                                                />
                                                <p className="text-xs text-slate-500 mt-2">Usaremos este email para enviarte tu usuario y contraseña.</p>
                                            </div>
                                            <button type="submit" className="w-full bg-brand-500 hover:bg-brand-400 py-4 rounded-xl font-bold uppercase tracking-widest transition-all">
                                                Continuar al Pago
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {step === 2 && (
                                    <div className="space-y-6">
                                        {/* Method Selector */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setMethod('paypal')}
                                                className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${method === 'paypal' ? 'bg-blue-500/10 border-blue-500 text-white' : 'bg-slate-900 border-transparent text-slate-500 hover:bg-slate-800'}`}
                                            >
                                                <CreditCard size={24} />
                                                <span className="font-bold text-xs uppercase">Tarjeta / PayPal</span>
                                            </button>
                                            <button
                                                onClick={() => setMethod('crypto')}
                                                className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${method === 'crypto' ? 'bg-orange-500/10 border-orange-500 text-white' : 'bg-slate-900 border-transparent text-slate-500 hover:bg-slate-800'}`}
                                            >
                                                <Wallet size={24} />
                                                <span className="font-bold text-xs uppercase">Criptomonedas</span>
                                            </button>
                                        </div>

                                        {/* PayPal View */}
                                        {method === 'paypal' && (
                                            <div className="bg-white p-8 rounded-3xl animate-fade-in shadow-xl">
                                                <div className="mb-6 text-center">
                                                    <h3 className="text-slate-900 font-bold mb-1">Pago Seguro con PayPal</h3>
                                                    <p className="text-slate-500 text-xs">Aceptamos todas las tarjetas de crédito y débito.</p>
                                                </div>
                                                <PayPalButtons
                                                    style={{ layout: "vertical", shape: "pill", label: "pay" }}
                                                    createOrder={(data, actions) => {
                                                        return fetch("/api/payments/paypal", {
                                                            method: "POST",
                                                            headers: { "Content-Type": "application/json" },
                                                            body: JSON.stringify({ plan: planKey, amount: usdPrice }),
                                                        })
                                                            .then((res) => res.json())
                                                            .then((order) => order.id);
                                                    }}
                                                    onApprove={(data, actions) => {
                                                        return actions.order!.capture().then((details) => {
                                                            handlePayPalSuccess(details);
                                                        });
                                                    }}
                                                />
                                            </div>
                                        )}

                                        {/* Crypto View */}
                                        {method === 'crypto' && (
                                            <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 animate-fade-in">
                                                <div className="flex items-center gap-2 mb-6">
                                                    <AlertTriangle size={16} className="text-yellow-500" />
                                                    <p className="text-[10px] text-yellow-500 font-bold uppercase tracking-tight">Envía solo por redes EVM compatibles</p>
                                                </div>

                                                <div className="mb-8">
                                                    <label className="block text-xs font-bold mb-3 text-slate-500 uppercase">Selecciona la Red</label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {NETWORKS.map(net => (
                                                            <button
                                                                key={net.name}
                                                                onClick={() => setSelectedNetwork(net)}
                                                                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase border transition-all ${selectedNetwork.name === net.name
                                                                    ? `${net.color} border-transparent text-white`
                                                                    : 'border-white/10 text-slate-400 hover:border-white/30'
                                                                    }`}
                                                            >
                                                                {net.name}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-slate-950 p-6 rounded-xl border border-white/5 mb-8 text-center break-all">
                                                    <p className="text-[10px] text-slate-500 uppercase font-bold mb-2 tracking-widest">Dirección de Depósito</p>
                                                    <div className="font-mono text-sm text-white mb-4">{WALLET_ADDRESS}</div>
                                                    <button onClick={() => handleCopy(WALLET_ADDRESS)} className="mx-auto flex items-center gap-2 text-brand-400 text-xs font-bold hover:text-brand-300">
                                                        {copied ? <Check size={14} /> : <Copy size={14} />}
                                                        {copied ? 'Copiado' : 'Copiar Dirección'}
                                                    </button>
                                                </div>

                                                <form onSubmit={handleSubmitCrypto} className="space-y-4">
                                                    <div>
                                                        <label className="block text-xs font-bold mb-2 text-slate-500 uppercase">Hash de Transacción (TXID)</label>
                                                        <input
                                                            type="text"
                                                            required
                                                            value={txHash}
                                                            onChange={e => setTxHash(e.target.value)}
                                                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none text-sm"
                                                            placeholder="0x..."
                                                        />
                                                    </div>
                                                    <button disabled={loading} type="submit" className="w-full bg-brand-500 hover:bg-brand-400 py-4 rounded-xl font-bold uppercase tracking-widest transition-all disabled:opacity-50">
                                                        {loading ? 'Verificando...' : 'He realizado el pago'}
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
        </PayPalScriptProvider>
    );
}

