/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // experimental: { esmExternals: true },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/contract-all",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
