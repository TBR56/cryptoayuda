import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { ArrowLeft, Upload, CheckCircle, Copy, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const PLAN_DETAILS = {
    'básico': { name: 'Plan Básico', price: 6000, duration: '8 horas' },
    'avanzado': { name: 'Plan Avanzado', price: 11500, duration: '20 horas' },
    'profesional': { name: 'Plan Profesional', price: 20000, duration: '+30 horas' }
};

export default function PagoPage() {
    const router = useRouter();
    const { plan } = router.query;
    const [email, setEmail] = useState('');
    const [proofFile, setProofFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);

    const planDetails = plan && typeof plan === 'string' ? PLAN_DETAILS[plan as keyof typeof PLAN_DETAILS] : undefined;
    const MERCADOPAGO_ALIAS = 'brunsss.mp';

    if (!planDetails || !plan) {
        return null;
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setProofFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !proofFile) return;

        setUploading(true);

        try {
            // Convert image to base64
            const reader = new FileReader();
            reader.readAsDataURL(proofFile);

            reader.onload = async () => {
                const base64Image = reader.result as string;

                const response = await fetch('/api/payments/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email,
                        plan: plan as string,
                        amount: planDetails.price,
                        proofImageBase64: base64Image
                    })
                });

                if (response.ok) {
                    setSubmitted(true);
                } else {
                    const error = await response.json();
                    console.error('Error:', error);
                    alert('Error al enviar el comprobante. Intenta nuevamente.');
                }
                setUploading(false);
            };

            reader.onerror = () => {
                alert('Error al leer la imagen. Intenta nuevamente.');
                setUploading(false);
            };
        } catch (error) {
            console.error('Error:', error);
            alert('Error de conexión. Intenta nuevamente.');
            setUploading(false);
        }
    };

    const copyAlias = () => {
        navigator.clipboard.writeText(MERCADOPAGO_ALIAS);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-950 text-white">
                <Head>
                    <title>Pago Enviado - Academia Cripto Segura</title>
                </Head>
                <Navbar />
                <main className="max-w-2xl mx-auto px-4 py-24">
                    <div className="bg-slate-900/50 border border-green-500/20 rounded-3xl p-12 text-center">
                        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle size={48} className="text-green-500" />
                        </div>
                        <h1 className="text-4xl font-black mb-4 uppercase italic tracking-tighter">¡Comprobante Recibido!</h1>
                        <p className="text-slate-400 mb-8 leading-relaxed">
                            Hemos recibido tu comprobante de pago. Nuestro equipo lo verificará en las próximas <strong className="text-white">24 horas</strong>.
                        </p>
                        <div className="bg-brand-500/10 border border-brand-500/20 rounded-2xl p-6 mb-8">
                            <p className="text-sm text-slate-300 mb-2">📧 Recibirás un email en:</p>
                            <p className="text-xl font-bold text-brand-400">{email}</p>
                        </div>
                        <p className="text-xs text-slate-500 mb-8">
                            El email contendrá tus credenciales de acceso a la plataforma. Revisa también tu carpeta de spam.
                        </p>
                        <Link href="/" className="inline-block bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl font-bold transition-all border border-white/10">
                            Volver al Inicio
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <Head>
                <title>Pago - {planDetails.name} | Academia Cripto Segura</title>
            </Head>
            <Navbar />
            <main className="max-w-5xl mx-auto px-4 py-12">
                <Link href="/academia" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={20} /> Volver a Planes
                </Link>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Plan Summary */}
                    <div className="bg-gradient-to-br from-purple-900/40 via-slate-900 to-slate-950 border border-purple-500/20 rounded-3xl p-8">
                        <div className="inline-block px-4 py-1 rounded-full bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest mb-6">
                            Resumen de Compra
                        </div>
                        <h2 className="text-3xl font-black mb-2 uppercase italic tracking-tighter">{planDetails.name}</h2>
                        <p className="text-slate-400 text-sm mb-8">{planDetails.duration} de formación intensiva</p>

                        <div className="bg-white/5 rounded-2xl p-6 mb-8">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-slate-400">Precio</span>
                                <span className="text-3xl font-black">${planDetails.price.toLocaleString()}</span>
                            </div>
                            <div className="text-xs text-slate-500 border-t border-white/10 pt-4">
                                Pago único • Acceso de por vida
                            </div>
                        </div>

                        <div className="bg-brand-500/10 border border-brand-500/20 rounded-2xl p-6">
                            <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                                <AlertCircle size={16} className="text-brand-400" />
                                Importante
                            </h3>
                            <ul className="text-xs text-slate-400 space-y-2">
                                <li>✓ Verificación manual en 24hs</li>
                                <li>✓ Credenciales enviadas por email</li>
                                <li>✓ Acceso inmediato tras aprobación</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Payment Instructions */}
                    <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8">
                        <h2 className="text-2xl font-black mb-6 uppercase italic tracking-tighter">Instrucciones de Pago</h2>

                        <div className="space-y-6 mb-8">
                            <div className="bg-white/5 rounded-2xl p-6">
                                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">Paso 1: Transferir a</div>
                                <div className="flex items-center justify-between bg-slate-950 rounded-xl p-4 border border-white/10">
                                    <div>
                                        <div className="text-xs text-slate-500 mb-1">Alias de Mercado Pago</div>
                                        <div className="text-xl font-black text-brand-400">{MERCADOPAGO_ALIAS}</div>
                                    </div>
                                    <button
                                        onClick={copyAlias}
                                        className="bg-white/5 hover:bg-white/10 p-3 rounded-lg transition-colors"
                                        title="Copiar alias"
                                    >
                                        {copied ? <CheckCircle size={20} className="text-green-500" /> : <Copy size={20} />}
                                    </button>
                                </div>
                                <p className="text-xs text-slate-500 mt-3">
                                    Monto exacto: <strong className="text-white">${planDetails.price.toLocaleString()} ARS</strong>
                                </p>
                            </div>

                            <div className="bg-white/5 rounded-2xl p-6">
                                <div className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-4">Paso 2: Subir Comprobante</div>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold mb-2">Tu Email</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="tu@email.com"
                                            required
                                            className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-500 transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold mb-2">Comprobante de Pago</label>
                                        <div className="relative">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                required
                                                className="hidden"
                                                id="proof-upload"
                                            />
                                            <label
                                                htmlFor="proof-upload"
                                                className="flex items-center justify-center gap-3 w-full bg-slate-950 border-2 border-dashed border-white/20 hover:border-brand-500/50 rounded-xl px-4 py-8 cursor-pointer transition-all group"
                                            >
                                                <Upload size={24} className="text-slate-600 group-hover:text-brand-400 transition-colors" />
                                                <span className="text-sm text-slate-400 group-hover:text-white transition-colors">
                                                    {proofFile ? proofFile.name : 'Seleccionar imagen'}
                                                </span>
                                            </label>
                                        </div>
                                        <p className="text-xs text-slate-500 mt-2">Captura de pantalla del pago realizado</p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={!email || !proofFile || uploading}
                                        className="w-full bg-brand-500 hover:bg-brand-400 disabled:bg-slate-800 disabled:text-slate-600 text-white font-black py-4 rounded-2xl uppercase tracking-widest transition-all shadow-xl disabled:shadow-none"
                                    >
                                        {uploading ? 'Enviando...' : 'Enviar Comprobante'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
