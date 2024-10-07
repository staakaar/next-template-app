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
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.node/,
            use: "raw-loader",
        });
        return config;
    },
};

export default nextConfig;
