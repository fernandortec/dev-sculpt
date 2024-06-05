import { Header } from "@/(authenticated)/dashboard/(components)/header";
import type { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
