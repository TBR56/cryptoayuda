/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        unoptimized: true,
    },
    // This helps with large SSG builds
    staticPageGenerationTimeout: 300,
}

module.exports = nextConfig
