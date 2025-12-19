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
}

export default function SeoHead({
    title,
    description,
    image = "https://images.unsplash.com/photo-1621504450374-147cb9225562?auto=format&fit=crop&w=1200&q=80",
    url = "https://cryptoayudahoy.vercel.app",
    type = "website",
    publishedTime,
    author = "CryptoAyuda Team",
    jsonLd
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
    const pathSegments = url.replace('https://cryptoayudahoy.vercel.app', '').split('/').filter(Boolean);
    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Inicio",
                "item": "https://cryptoayudahoy.vercel.app"
            },
            ...pathSegments.map((segment, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
                "item": `https://cryptoayudahoy.vercel.app/${pathSegments.slice(0, index + 1).join('/')}`
            }))
        ]
    };

    // 3. ORGANIZATION & WEBSITE JSON-LD
    const organizationLd = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "CryptoAyuda",
        "url": "https://cryptoayudahoy.vercel.app",
        "logo": "https://cryptoayudahoy.vercel.app/logo.png",
        "sameAs": [
            "https://twitter.com/cryptoayuda",
            "https://facebook.com/cryptoayuda"
        ]
    };

    const websiteLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "CryptoAyuda",
        "url": "https://cryptoayudahoy.vercel.app",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://cryptoayudahoy.vercel.app/noticias?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    return (
        <Head>
            <title>{siteTitle}</title>
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />

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
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}

        </Head>


    );
}
