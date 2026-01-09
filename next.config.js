/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
    },
    // This helps with large SSG builds
    staticPageGenerationTimeout: 1000,
    output: 'standalone',
}

module.exports = nextConfig
