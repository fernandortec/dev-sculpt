/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		reactCompiler: true,
	},
	transpilePackages: [
		"@sculpt/env",
		"@sculpt/drizzle",
		"@sculpt/tsconfig",
		"@sculpt/server",
	],
};


export default nextConfig;
