import React from 'react';

interface ScoreCardProps {
    score: number;
    label: string;
    subLabel?: string;
    size?: 'sm' | 'md' | 'lg';
}

export default function ScoreCard({ score, label, subLabel, size = 'md' }: ScoreCardProps) {
    const circumference = 2 * Math.PI * 40; // r=40
    const percent = (score / 10) * 100;
    const offset = circumference - (percent / 100) * circumference;

    // Color logic
    let colorClass = "text-brand-500";
    if (score >= 9) colorClass = "text-success";
    else if (score >= 7) colorClass = "text-brand-400";
    else if (score >= 5) colorClass = "text-yellow-400";
    else colorClass = "text-error";

    const sizeClasses = {
        sm: "w-24 h-24 text-2xl",
        md: "w-32 h-32 text-4xl",
        lg: "w-48 h-48 text-6xl"
    };

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className={`relative flex items-center justify-center ${sizeClasses[size]} mb-2`}>
                <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                    <circle
                        className="text-slate-800"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                    />
                    <circle
                        className={`${colorClass} transition-all duration-1000 ease-out`}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="40"
                        cx="50"
                        cy="50"
                    />
                </svg>
                <span className={`absolute font-display font-black text-white`}>{score}</span>
            </div>
            <div className="text-center">
                <h4 className="font-bold text-slate-300 text-sm uppercase tracking-wider">{label}</h4>
                {subLabel && <p className="text-xs text-slate-500 mt-1">{subLabel}</p>}
            </div>
        </div>
    );
}
