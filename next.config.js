const isProd = process.env.NODE_ENV === 'production'

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true' && isProd,
})

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	reactStrictMode: false,
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
        domains: ['d3hk78fplavsbl.cloudfront.net'],
    },
	async headers() {
		return [
		  {
			source: '/:all*(svg|jpg|png|avif|webp|ttf|woff|woff2|otf)',
			locale: false,
			headers: [
			  {
				key: 'Cache-Control',
				value: 'public, max-age=9999999999, must-revalidate',
			  }
			],
		  },
		]
	},
}

module.exports = withBundleAnalyzer(nextConfig)