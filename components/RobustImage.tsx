import React, { useState } from 'react';

interface RobustImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string;
    alt: string;
    className?: string;
    priority?: boolean;
}

export default function RobustImage({ src, alt, className, priority, ...props }: RobustImageProps) {
    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // If error, show a beautiful gradient placeholder with an icon
    if (error) {
        return (
            <div className={`flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 ${className}`}>
                <div className="text-center p-4">
                    <span className="text-4xl opacity-20">🖼️</span>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden ${className} bg-slate-800`}>
            {/* Shimmer loading effect */}
            {!loaded && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
            )}

            <img
                src={src}
                alt={alt}
                className={`w-full h-full object-cover transition-all duration-700 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                onError={() => setError(true)}
                onLoad={() => setLoaded(true)}
                loading={priority ? "eager" : "lazy"}
                decoding="async"
                {...props}
            />
        </div>
    );
}
