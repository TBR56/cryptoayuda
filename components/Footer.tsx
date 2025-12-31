import Link from 'next/link';
import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <div className="font-display font-black text-2xl tracking-tight text-white mb-6">
                            Crypto<span className="text-brand-500">Ayuda</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                            La plataforma líder en análisis de seguridad financiera y criptoactivos. Misión: Proteger tu capital con información verificada.
                        </p>
                        <div className="flex space-x-4">
                            {['Twitter', 'Telegram', 'Discord'].map(s => (
                                <a key={s} href="#" className="w-8 h-8 rounded bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-brand-600 transition-all">
                                    {s[0]}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Explorar</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link href="/reviews" className="hover:text-brand-400 transition-colors">Exchanges</Link></li>
                            <li><Link href="/comparar" className="hover:text-brand-400 transition-colors">Comparativas</Link></li>
                            <li><Link href="/problemas" className="hover:text-brand-400 transition-colors">Solucionar Problemas</Link></li>
                            <li><Link href="/opiniones" className="hover:text-brand-400 transition-colors">Opiniones Locales</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-400">
                            <li><Link href="/terminos" className="hover:text-brand-400 transition-colors">Términos de Uso</Link></li>
                            <li><Link href="/privacidad" className="hover:text-brand-400 transition-colors">Política de Privacidad</Link></li>
                            <li><Link href="/disclaimer" className="hover:text-brand-400 transition-colors">Descargo de Responsabilidad</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Newsletter</h4>
                        <p className="text-slate-500 text-xs mb-4">Recibe alertas de seguridad urgentes.</p>
                        <div className="flex">
                            <input type="email" placeholder="Email..." className="bg-slate-900 border border-slate-800 text-white px-4 py-2 text-sm rounded-l focus:outline-none focus:border-brand-500 w-full" />
                            <button className="bg-brand-600 px-4 py-2 text-white font-bold uppercase text-xs rounded-r hover:bg-brand-500 transition-colors">OK</button>
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-600 text-xs text-center md:text-right w-full">© 2025 CryptoAyuda Intelligence. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
