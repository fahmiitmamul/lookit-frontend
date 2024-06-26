/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.fallback = {
            fs: false,
        }
        config.resolve.alias = {
            ...config.resolve.alias,
            canvas: false,
        }
        return config
    },
    async rewrites() {
        return [
            {
                source: '/api/submissions',
                destination: '/api/submissions',
            },
        ]
    },
}

module.exports = nextConfig
