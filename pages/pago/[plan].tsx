import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useCryptoPrice } from '../../hooks/useCryptoPrice';
import { Copy, Check, CreditCard, Wallet, AlertTriangle, ArrowRight, ShieldCheck, Upload } from 'lucide-react';

const WALLET_ADDRESS = "0xf1f6033B91DA339b100118aB4493153b8dd67d8F";
const MP_ALIAS = "brunsss.mp";

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
    const [method, setMethod] = useState<'crypto' | 'mp'>('crypto');
    const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[1]); // Default BNB (Low fees)
    const [email, setEmail] = useState('');
    const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
    const [txHash, setTxHash] = useState('');
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    // Plan Details (Should match academia.tsx)
    const PLANS: Record<string, { price: number, name: string }> = {
        'crypto base': { price: 29, name: 'Crypto Base' },
        'crypto pro': { price: 59, name: 'Crypto Pro' },
        'crypto mastery': { price: 99, name: 'Crypto Mastery' }
    };

    const currentPlan = PLANS[typeof plan === 'string' ? plan.toLowerCase().replace(/%20/g, ' ') : ''] || PLANS['crypto base'];
    const arsAmount = usdtPrice ? Math.ceil(currentPlan.price * usdtPrice) : null;

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/payments/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    plan: currentPlan.name,
                    amount: currentPlan.price,
                    method,
                    txHash: method === 'crypto' ? txHash : undefined,
                    // For MP we would handle proof upload in a real version, here just mimicking
                    metadata: { network: selectedNetwork.name }
                })
            });

            if (res.ok) {
                setStep(3);
                // Trigger auto-email from backend
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
                    <div className="text-center animate-fade-in">
                        <div className="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                            <ShieldCheck size={48} />
                        </div>
                        <h1 className="text-4xl font-black mb-4 uppercase italic">¡Inscripción Recibida!</h1>
                        <p className="text-slate-400 max-w-lg mx-auto mb-8">
                            Hemos recibido los detalles de tu pago. Nuestro sistema automatizado está verificando la transacción. <br /><br />
                            Una vez confirmada (aprox. 10-30 min), recibirás tus credenciales de acceso en: <span className="text-white font-bold">{email}</span>.
                        </p>
                        <button onClick={() => router.push('/')} className="bg-slate-800 hover:bg-slate-700 px-8 py-3 rounded-xl font-bold uppercase tracking-widest transition-colors">
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
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold">{currentPlan.name}</span>
                                        <span className="text-brand-400 font-bold">${currentPlan.price} USD</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm text-slate-500">
                                        <span>Aprox. en Pesos</span>
                                        <span>≈ {arsAmount ? `$${arsAmount.toLocaleString('es-AR')}` : 'Calculando...'} ARS</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-xs text-green-400">
                                        <Check size={12} /> Acceso Inmediato
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-green-400">
                                        <Check size={12} /> Garantía de Seguridad
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
                                            <label className="block text-sm font-bold mb-2">Email para recibir el acceso</label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none"
                                                placeholder="tu@email.com"
                                            />
                                            <p className="text-xs text-slate-500 mt-2">Asegúrate de tener acceso a este correo.</p>
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
                                            onClick={() => setMethod('crypto')}
                                            className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${method === 'crypto' ? 'bg-brand-500/10 border-brand-500 text-white' : 'bg-slate-900 border-transparent text-slate-500 hover:bg-slate-800'}`}
                                        >
                                            <Wallet size={24} />
                                            <span className="font-bold text-sm uppercase">Criptomonedas</span>
                                        </button>
                                        <button
                                            onClick={() => setMethod('mp')}
                                            className={`p-4 rounded-xl border flex flex-col items-center gap-3 transition-all ${method === 'mp' ? 'bg-blue-500/10 border-blue-500 text-white' : 'bg-slate-900 border-transparent text-slate-500 hover:bg-slate-800'}`}
                                        >
                                            <CreditCard size={24} />
                                            <span className="font-bold text-sm uppercase">Mercado Pago</span>
                                        </button>
                                    </div>

                                    {/* Crypto View */}
                                    {method === 'crypto' && (
                                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 animate-fade-in">
                                            <div className="flex items-center gap-2 mb-6">
                                                <AlertTriangle size={16} className="text-yellow-500" />
                                                <p className="text-xs text-yellow-500 font-bold uppercase">Envía solo por redes compatibles (EVM)</p>
                                            </div>

                                            <div className="mb-8">
                                                <label className="block text-sm font-bold mb-3">Red Seleccionada</label>
                                                <div className="flex flex-wrap gap-2">
                                                    {NETWORKS.map(net => (
                                                        <button
                                                            key={net.name}
                                                            onClick={() => setSelectedNetwork(net)}
                                                            className={`px-3 py-1 rounded-lg text-xs font-bold uppercase border transition-all ${selectedNetwork.name === net.name
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
                                                <p className="text-xs text-slate-500 uppercase font-bold mb-2">Dirección de Depósito (Unificada)</p>
                                                <div className="font-mono text-lg text-white mb-4">{WALLET_ADDRESS}</div>
                                                <button onClick={() => handleCopy(WALLET_ADDRESS)} className="mx-auto flex items-center gap-2 text-brand-400 text-sm font-bold hover:text-brand-300">
                                                    {copied ? <Check size={16} /> : <Copy size={16} />}
                                                    {copied ? 'Copiado' : 'Copiar Dirección'}
                                                </button>
                                            </div>

                                            <form onSubmit={handleSubmit}>
                                                <label className="block text-sm font-bold mb-2">Hash de Transacción (ID)</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={txHash}
                                                    onChange={e => setTxHash(e.target.value)}
                                                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 focus:border-brand-500 outline-none mb-2"
                                                    placeholder="0x..."
                                                />
                                                <p className="text-xs text-slate-500 mb-6">Pega el ID de tu transacción aquí para verificación automática.</p>

                                                <button disabled={loading} type="submit" className="w-full bg-brand-500 hover:bg-brand-400 py-4 rounded-xl font-bold uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                                                    {loading ? 'Verificando...' : 'Confirmar Pago'}
                                                </button>
                                            </form>
                                        </div>
                                    )}

                                    {/* Mercado Pago View */}
                                    {method === 'mp' && (
                                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 animate-fade-in">
                                            <div className="text-center mb-8">
                                                <p className="text-xs text-slate-500 uppercase font-bold mb-2">Alias CVU / Mercado Pago</p>
                                                <h3 className="text-3xl font-black text-blue-400 mb-4">{MP_ALIAS}</h3>
                                                <p className="text-sm text-slate-400">Envía exactamente: <span className="text-white font-bold">${arsAmount ? arsAmount.toLocaleString('es-AR') : '...'} ARS</span></p>
                                                <p className="text-xs text-slate-600 mt-2">Conversion cotizada al momento: 1 USDT = ${usdtPrice} ARS</p>
                                            </div>

                                            <form onSubmit={handleSubmit}>
                                                <div className="bg-slate-950 border border-dashed border-white/10 rounded-xl p-8 text-center mb-6 hover:border-blue-500/50 transition-colors cursor-pointer">
                                                    <Upload size={32} className="mx-auto text-slate-600 mb-3" />
                                                    <p className="text-sm text-slate-400 font-bold">Subir Comprobante</p>
                                                    <p className="text-xs text-slate-600 mt-1">(Opcional si envías desde mismo titular)</p>
                                                </div>

                                                <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl font-bold uppercase tracking-widest transition-all disabled:opacity-50">
                                                    {loading ? 'Procesando...' : 'Informar Transferencia'}
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

