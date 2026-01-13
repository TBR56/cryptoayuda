import Head from 'next/head';

interface SeoHeadProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'howto';
    publishedTime?: string;
    author?: string;
    jsonLd?: any;
    faq?: { q: string, a: string }[];
    rating?: { score: number, count: number };
    steps?: { name: string, text: string }[]; // For HowTo schema
}

export default function SeoHead({
    title,
    description,
    image = "https://images.unsplash.com/photo-1621504450374-147cb9225562?auto=format&fit=crop&w=1200&q=80",
    url = "https://www.cryptoayuda.org",
    type = "website",
    publishedTime = new Date().toISOString(),
    author = "Equipo de Expertos CryptoAyuda",
    jsonLd,
    faq,
    rating,
    steps
}: SeoHeadProps) {

    // 1. DYNAMIC CTR OPTIMIZATION (Year/Month injection)
    const currentYear = new Date().getFullYear();
    const currentMonth = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(new Date());
    const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);

    const safeTitle = title || 'CryptoAyuda Intelligence';
    const safeDescription = description || 'Plataforma líder en auditoría y recuperación de activos digitales.';

    let ctaTitle = safeTitle;
    const lowerTitle = safeTitle.toLowerCase();

    if (lowerTitle.includes('guía') || lowerTitle.includes('cómo')) {
        ctaTitle = `[GUÍA] ${safeTitle} (${capitalizedMonth} ${currentYear})`;
    } else if (lowerTitle.includes('review') || lowerTitle.includes('opiniones')) {
        ctaTitle = `🛡️ ${safeTitle} - Análisis Real ${currentYear}`;
    } else if (lowerTitle.includes('alerta') || lowerTitle.includes('estafa')) {
        ctaTitle = `⚠️ ALERTA: ${safeTitle} (Cuidado)`;
    } else if (lowerTitle.includes('solución') || lowerTitle.includes('problema')) {
        ctaTitle = `✅ Solución: ${safeTitle} - Paso a Paso`;
    }

    const siteTitle = `${ctaTitle.slice(0, 50)} | CryptoAyuda`;

    // 2. AUTOMATIC BREADCRUMBS JSON-LD
    const pathSegments = url.replace('https://www.cryptoayuda.org', '').split('/').filter(Boolean);
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://www.cryptoayuda.org"
            },
            ...pathSegments.map((segment, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
                "item": `https://www.cryptoayuda.org/${pathSegments.slice(0, index + 1).join('/')}`
            }))
        ]
    };

    // 3. ENHANCED ARTICLE / SCHEMA
    const mainEntityLd = type === 'article' ? {
        "@context": "https://schema.org",
        "@type": "Article",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": url
        },
        "headline": title.slice(0, 110),
        "image": [image],
        "datePublished": publishedTime,
        "dateModified": new Date().toISOString(),
        "author": {
            "@type": "Organization",
            "name": author,
            "url": "https://www.cryptoayuda.org"
        },
        "publisher": {
            "@type": "Organization",
            "name": "CryptoAyuda",
            "logo": {
                "@type": "ImageObject",
                "url": "https://www.cryptoayuda.org/logo.png"
            }
        },
        "description": description
    } : null;

    // 4. HOWTO SCHEMA
    const howToLd = (type === 'howto' || steps) ? {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": title,
        "description": description,
        "step": steps?.map((s, i) => ({
            "@type": "HowToStep",
            "position": i + 1,
            "name": s.name || `Paso ${i + 1}`,
            "itemListElement": [{
                "@type": "HowToDirection",
                "text": s.text
            }]
        }))
    } : null;

    // 5. FAQ SCHEMA
    const faqLd = faq ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faq.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    } : null;

    // 6. REVIEW SCHEMA (Aggregated)
    const reviewLd = rating ? {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": title,
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": rating.score,
            "reviewCount": rating.count,
            "bestRating": "5",
            "worstRating": "1"
        }
    } : null;

    return (
        <Head>
            <title>{siteTitle}</title>
            <meta name="description" content={safeDescription.slice(0, 155)} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="google-site-verification" content="google79d7506bdb76c169" />
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            <link rel="canonical" href={url} />

            {/* Open Graph */}
            <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={safeDescription.slice(0, 155)} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="CryptoAyuda" />
            <meta property="og:locale" content="es_ES" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={safeDescription.slice(0, 155)} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            {mainEntityLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(mainEntityLd) }} />}
            {howToLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToLd) }} />}
            {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
            {reviewLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }} />}
            {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
        </Head>
    );
}
