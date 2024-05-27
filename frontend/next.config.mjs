/** @type {import('next').NextConfig} */

const cspHeader = `
    frame-ancestors 'self';
    script-src 'self';
    style-src 'self';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    upgrade-insecure-requests;
`
const nextConfig = {
    reactStrictMode: false,
    // async headers() {
    //     return [
    //         {
    //             source: '/(.*)',
    //             headers: [
    //             {
    //                 key: 'Content-Security-Policy',
    //                 value: cspHeader.replace(/\n/g, ''),
    //             },
    //             ],
    //         },
    //     ]
    // },
};

export default nextConfig;
