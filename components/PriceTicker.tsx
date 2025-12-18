import React from 'react';

export default function PriceTicker() {
    return (
        <div className="bg-slate-950 border-b border-white/5 text-xs py-2 overflow-hidden whitespace-nowrap relative z-50">
            <div className="inline-flex space-x-12 animate-marquee font-mono font-bold tracking-widest uppercase">
                <span className="text-success flex gap-2">BTC <span className="text-white">$72,450</span> ▲ 4.2%</span>
                <span className="text-error flex gap-2">ETH <span className="text-white">$3,950</span> ▼ 1.2%</span>
                <span className="text-success flex gap-2">SOL <span className="text-white">$145</span> ▲ 8.5%</span>
                <span className="text-brand-400 flex gap-2">BNB <span className="text-white">$610</span></span>
                <span className="text-accent-400 flex gap-2">ADA <span className="text-white">$0.65</span></span>
                <span className="text-success flex gap-2">DOGE <span className="text-white">$0.18</span> ▲ 20%</span>
                {/* Duplicate for infinite loop illusion */}
                <span className="text-success flex gap-2">BTC <span className="text-white">$72,450</span> ▲ 4.2%</span>
                <span className="text-error flex gap-2">ETH <span className="text-white">$3,950</span> ▼ 1.2%</span>
                <span className="text-success flex gap-2">SOL <span className="text-white">$145</span> ▲ 8.5%</span>
                <span className="text-brand-400 flex gap-2">BNB <span className="text-white">$610</span></span>
                <span className="text-accent-400 flex gap-2">ADA <span className="text-white">$0.65</span></span>
                <span className="text-success flex gap-2">DOGE <span className="text-white">$0.18</span> ▲ 20%</span>
            </div>
            <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none"></div>
            <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none"></div>
        </div>
    );
}
