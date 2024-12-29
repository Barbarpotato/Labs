/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    siteUrl: 'https://barbarpotato.github.io/Labs/',
    generateSitemap: true,
    output: 'export',
    basePath: '/Labs', // The repository name
    assetPrefix: '/Labs', // The repository name
}

export default nextConfig