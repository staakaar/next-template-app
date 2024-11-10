import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE == "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // experimental: { esmExternals: true },
    experimental: {
        turbo: {
            resolveExtensions: [
                ".mdx",
                ".tsx",
                ".ts",
                ".jsx",
                ".js",
                ".mjs",
                ".json",
            ],
        },
        optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: "",
    //             destination: "/ja/contract-all"
    //         }
    //     ]
    // },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/ja/contract-all",
                permanent: true,
            },
        ];
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.node/,
            use: "raw-loader",
        });
        return config;
    },
};

export default withBundleAnalyzer(nextConfig);
