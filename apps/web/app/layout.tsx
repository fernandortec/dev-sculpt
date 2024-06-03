import "../public/global.css";

import { MswMocksProvider } from "@/lib/msw/msw-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

export const metadata: Metadata = {
	title: "Dev Sculpt",
};
const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
	return (
		<html lang="pt-BR">
			<body className={inter.className}>{children}</body>
			<Toaster richColors />
			<MswMocksProvider />
		</html>
	);
}
