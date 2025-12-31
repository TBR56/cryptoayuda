import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { ShieldCheck, CheckCircle, ExternalLink, Download } from 'lucide-react';

export default function CertificatePage() {
    const router = useRouter();
    const { id } = router.query;

    // In a real app, verify ID against DB via API/SSR
    const isValid = id && typeof id === 'string' && id.startsWith('CYKA-');

    // Mock Data
    const certDate = new Date().toLocaleDateString();

    if (!isValid) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-500 mb-4">Certificado Inválido</h1>
                    <p className="text-slate-500">El ID proporcionado no corresponde a ningún registro oficial.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-900 font-serif p-4 flex items-center justify-center">
            <Head><title>Verificación de Certificado | CryptoAyuda</title></Head>

            <div className="bg-white w-full max-w-4xl aspect-[1.414/1] relative p-12 border-8 border-double border-slate-200 shadow-2xl flex flex-col items-center text-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">

                {/* Decoration */}
                <div className="absolute top-8 left-8 w-24 h-24 border-t-4 border-l-4 border-brand-600"></div>
                <div className="absolute bottom-8 right-8 w-24 h-24 border-b-4 border-r-4 border-brand-600"></div>

                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-5xl font-black uppercase tracking-widest text-slate-900 mb-2">Certificado</h1>
                    <p className="text-xl text-slate-500 font-sans font-bold uppercase tracking-[0.3em]">de Competencia Profesional</p>
                </div>

                {/* Body */}
                <div className="flex-1 flex flex-col justify-center w-full max-w-2xl">
                    <p className="text-lg text-slate-500 italic mb-4 font-sans">Se otorga el presente reconocimiento a</p>
                    <h2 className="text-4xl font-bold text-brand-600 mb-8 border-b-2 border-brand-600/20 pb-4">ESTUDIANTE EJEMPLAR</h2>

                    <p className="text-lg text-slate-500 italic mb-4 font-sans">Por haber completado satisfactoriamente el programa</p>
                    <h3 className="text-2xl font-bold text-slate-800 mb-8 uppercase">Operador Cripto Profesional</h3>

                    <p className="text-slate-600 font-sans leading-relaxed">
                        Habiendo demostrado dominio en las competencias de: <br />
                        <b>Gestión de Riesgo, Análisis On-Chain, y Seguridad Operativa</b>.
                    </p>
                </div>

                {/* Footer */}
                <div className="w-full flex justify-between items-end mt-12 font-sans">
                    <div className="text-left">
                        <div className="w-32 h-32 bg-slate-100 mb-2 p-2">
                            {/* QR Placeholder */}
                            <div className="w-full h-full bg-slate-900 flex items-center justify-center text-white text-xs">QR SEGURO</div>
                        </div>
                        <p className="text-xs text-slate-400 font-mono">ID: {id}</p>
                    </div>

                    <div className="text-center">
                        <div className="h-16 mb-2 flex items-end justify-center">
                            <span className="font-cursive text-3xl text-slate-800">CryptoAyuda Org</span>
                        </div>
                        <div className="w-64 h-px bg-slate-400 mb-2"></div>
                        <p className="text-xs font-bold uppercase text-slate-500">Firma Autorizada</p>
                    </div>

                    <div className="text-right">
                        <p className="text-sm font-bold text-slate-800 mb-1">Fecha de Emisión</p>
                        <p className="text-lg text-brand-600">{certDate}</p>
                    </div>
                </div>

                {/* Verified Badge */}
                <div className="absolute top-8 right-8 flex flex-col items-center">
                    <ShieldCheck size={48} className="text-green-600 mb-2" />
                    <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest border border-green-200">
                        Verificado
                    </span>
                </div>
            </div>

            {/* Float UI */}
            <div className="fixed bottom-8 right-8 flex gap-4 font-sans">
                <Link href="/" className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold shadow-xl hover:bg-black transition-all flex items-center gap-2">
                    <ExternalLink size={16} /> Validar en Blockchain
                </Link>
                <button className="bg-brand-600 text-white px-6 py-3 rounded-full font-bold shadow-xl hover:bg-brand-500 transition-all flex items-center gap-2">
                    <Download size={16} /> Descargar PDF
                </button>
            </div>
        </div>
    );
}
