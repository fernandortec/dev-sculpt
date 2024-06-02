import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "../public/global.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
	title: "Dev Sculpt",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}): JSX.Element {
	return (
		<html lang="pt-BR">
			<body className={inter.className}>{children}</body>
			<Toaster richColors />
		</html>
	);
}
