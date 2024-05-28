/** @type {import('next').NextConfig} */

const cspHeader = `
    script-src 'self' 'unsafe-eval' 'unsafe-inline';
    style-src 'self' 'unsafe-inline';    
    img-src 'self' blob: data:;
    font-src 'self';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
`

const nextConfig = {
    reactStrictMode: false,
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                {
                    key: 'Content-Security-Policy',
                    value: cspHeader.replace(/\n/g, ''),
                },
                ],
            },
        ]
    },
};

export default nextConfig;
