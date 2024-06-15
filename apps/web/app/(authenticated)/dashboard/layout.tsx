import { Header } from "@/app/(components)/header";
import { UserProvider } from "@/providers/user/user-provider";
import type { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
	return (
		<>
			<UserProvider>
				<Header />
				{children}
			</UserProvider>
		</>
	);
}
