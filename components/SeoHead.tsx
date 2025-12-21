import Head from 'next/head';

interface SeoHeadProps {
    title: string;
    description: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article';
    publishedTime?: string;
    author?: string;
    jsonLd?: any;
    faq?: { q: string, a: string }[];
    rating?: { score: number, count: number };
}

export default function SeoHead({
    title,
    description,
    image = "https://images.unsplash.com/photo-1621504450374-147cb9225562?auto=format&fit=crop&w=1200&q=80",
    url = "https://www.cryptoayuda.org",
    type = "website",
    publishedTime,
    author = "CryptoAyuda Team",
    jsonLd,
    faq,
    rating
}: SeoHeadProps) {

    // 1. DYNAMIC CTA PREFIXES (AGGRESSIVE SEO)
    let ctaTitle = title;
    if (title.toLowerCase().includes('guía') || title.toLowerCase().includes('cómo')) {
        ctaTitle = `[OFICIAL] ${title} 2025`;
    } else if (title.toLowerCase().includes('review') || title.toLowerCase().includes('opiniones')) {
        ctaTitle = `🛡️ ${title} (Análisis Real)`;
    } else if (title.toLowerCase().includes('alerta') || title.toLowerCase().includes('estafa')) {
        ctaTitle = `⚠️ [URGENTE] ${title}`;
    }

    const siteTitle = `${ctaTitle} | CryptoAyuda`;

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

    // 3. ORGANIZATION & WEBSITE JSON-LD
    const organizationLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "CryptoAyuda",
        "url": "https://www.cryptoayuda.org",
        "logo": "https://www.cryptoayuda.org/logo.png",
        "sameAs": [
            "https://twitter.com/cryptoayuda",
            "https://facebook.com/cryptoayuda"
        ]
    };

    const websiteLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "CryptoAyuda",
        "url": "https://www.cryptoayuda.org",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.cryptoayuda.org/noticias?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    // 4. FAQ SCHEMA
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

    // 5. REVIEW SCHEMA (Aggregated)
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
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="google-site-verification" content="google79d7506bdb76c169" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />

            {/* Favicon - Multiple sizes for all browsers and Google Search */}
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
            <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png" />
            <link rel="icon" type="image/png" sizes="512x512" href="/favicon-512.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/favicon-192.png" />
            <link rel="shortcut icon" href="/favicon.png" />
            <link rel="manifest" href="/manifest.json" />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={siteTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="CryptoAyuda" />
            <meta property="og:locale" content="es_ES" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Article Specific */}
            {publishedTime && <meta property="article:published_time" content={publishedTime} />}
            {author && <meta name="author" content={author} />}

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
            {faqLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
            {reviewLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewLd) }} />}
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}

            {/* Monetización Global */}
            <script
                type="text/javascript"
                src="https://pl28306849.effectivegatecpm.com/8d/77/29/8d77299ae4287364e5fc157ec9bcb2a9.js"
            />
        </Head>


    );
}
