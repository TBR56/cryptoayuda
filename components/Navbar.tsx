import Link from 'next/link';
import React, { useState } from 'react';

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <Link href="/" className="group flex items-center space-x-2">
                            <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform duration-300">
                                <span className="text-2xl">🛡️</span>
                            </div>
                            <div className="font-display font-black text-2xl tracking-tight text-white">
                                Crypto<span className="text-brand-500">Ayuda</span>
                            </div>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-6">
                            <Link href="/noticias" className="text-slate-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all">
                                Noticias
                            </Link>
                            <Link href="/guias" className="text-slate-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all">
                                Guías
                            </Link>
                            <Link href="/estafas" className="text-red-400 hover:text-red-300 hover:bg-red-500/10 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all">
                                Alertas
                            </Link>
                            <Link href="/reviews" className="text-slate-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all">
                                Reviews
                            </Link>
                            <Link href="/comparar" className="text-slate-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wide transition-all">
                                Comparar
                            </Link>
                            <Link href="/servicios" className="text-brand-400 hover:text-brand-300 hover:bg-brand-500/10 px-3 py-2 rounded-md text-sm font-black uppercase tracking-wide transition-all border border-brand-500/30">
                                💎 Servicios Pro
                            </Link>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <Link href="/problemas">
                            <button className="bg-white text-slate-950 hover:bg-slate-200 px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                                Necesito Ayuda
                            </button>
                        </Link>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-slate-900 border-b border-white/5">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link href="/noticias" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Noticias</Link>
                        <Link href="/guias" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Guías</Link>
                        <Link href="/reviews" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Reviews</Link>
                        <Link href="/servicios" className="text-brand-400 hover:text-brand-300 block px-3 py-2 rounded-md text-base font-black">💎 SERVICIOS PRO</Link>
                        <Link href="/estafas" className="text-red-400 hover:text-red-300 block px-3 py-2 rounded-md text-base font-bold">Alertas de Estafa</Link>
                        <Link href="/problemas" className="text-slate-300 hover:text-white block px-3 py-2 rounded-md text-base font-bold">Soporte</Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
