import { MswMocksProvider } from "@/providers/msw/msw-provider";
import { ReactQueryProvider } from "@/providers/query/react-query-provider";
import "../public/global.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

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
			<body className={inter.className}>
				<ReactQueryProvider>{children}</ReactQueryProvider>
				<MswMocksProvider />
			</body>
		</html>
	);
}
