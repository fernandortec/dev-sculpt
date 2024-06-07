import { MswMocksProvider } from "@/lib/msw/msw-provider";
import "../public/global.css";


import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastProvider } from "@/lib/toast/toast-provider";

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
			
			<MswMocksProvider />
			<ToastProvider />
		</html>
	);
}
