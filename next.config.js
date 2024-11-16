import path from "node:path";
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
        optimizePackageImports: [
            "@mantine/core",
            "@mantine/hooks",
            "@mantine/dates",
            "@mantine/datatable",
            "mantine-datatable",
        ],
    },
    sassOptions: {
        implementation: "sass-embedded",
        additionalData: `@use "${path.join(process.cwd(), "_mantine")}" as mantine;`,
        includePaths: ["./src/styles", "./src/components"],
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
            // ルートパスからのリダイレクト
            {
                source: "/",
                destination: "/ja/contract-all",
                permanent: true,
            },
            // 言語パスのみの場合のリダイレクト
            {
                source: "/:lang(ja|en)",
                destination: "/:lang/contract-all",
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
