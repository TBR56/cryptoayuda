import React from 'react';
import SeoHead from '../components/SeoHead';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // I should check if Footer exists
import DiagnosticTool from '../components/DiagnosticTool';

export default function DiagnosticoPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-200">
            <SeoHead
                title="Herramienta de Diagnóstico Crypto"
                description="Analiza bloqueos en Binance, Coinbase y otros exchanges de forma oficial. Recupera acceso a tus fondos con nuestro diagnóstico guiado."
                url="https://cryptoayudahoy.vercel.app/diagnostico"
            />
            <Navbar />

            <main className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase italic tracking-tighter">
                            Diagnóstico de <span className="text-brand-500">Seguridad</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-slate-400 text-lg">
                            Nuestra herramienta avanzada analiza el estado de tus fondos en exchanges regulados y genera un plan de acción inmediato para recuperar el acceso.
                        </p>
                    </div>

                    <DiagnosticTool />
                </div>
            </main>

            {/* Footer implementation if it exists, otherwise I'll need to check */}
            <footer className="py-12 border-t border-white/5 bg-slate-900/20 text-center">
                <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">© 2025 CryptoAyuda - Protegiendo tus activos digitales</p>
            </footer>
        </div>
    );
}
