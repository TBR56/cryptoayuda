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
    url = "https://cryptoayuda.com",
    type = "website",
    publishedTime,
    author = "CryptoAyuda Team",
    jsonLd
}: SeoHeadProps) {

    const siteTitle = `${title} | CryptoAyuda`;

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
            {jsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            )}
            {/* Adsterra Popunder */}
            <script
                type="text/javascript"
                src="https://pl28286231.effectivegatecpm.com/e4/66/b3/e466b34eb771d131ac9e61eb44015230.js"
                async
            />
        </Head>
    );
}
