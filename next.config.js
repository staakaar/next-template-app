import path from "node:path";
import bundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/app/i18n/request.ts");

const withBundleAnalyzer = bundleAnalyzer({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // experimental: { esmExternals: true },
    transpilePackages: ["@mantine/core", "@mantine/hooks"],
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
        additionalData: `@use "${path.join(
            process.cwd(),
            "_mantine"
        )}" as mantine;`,
        includePaths: ["./src/styles", "./src/components"],
    },
    // async rewrites() {
    //     return [
    //         {
    //             source: "",
    //             destination: "/contract-all"
    //         }
    //     ]
    // },
    async redirects() {
        return [
            // ルートパスからのリダイレクト
            {
                source: "/",
                destination: "/contract-all",
                permanent: true,
            },
        ];
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.node/,
            use: "raw-loader",
        });

        // Canvas モジュールを無視 (PDFビューアー用)
        config.resolve.fallback = {
            ...config.resolve.fallback,
            canvas: false,
            fs: false,
            path: false,
        };

        // Node.js向けのモジュールを除外
        config.externals = config.externals || {};
        if (
            typeof config.externals === "object" &&
            !Array.isArray(config.externals)
        ) {
            config.externals = { ...config.externals, canvas: "canvas" };
        }

        return config;
    },
};

export default withNextIntl(withBundleAnalyzer(nextConfig));
