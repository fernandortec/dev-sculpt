"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function ReactQueryProvider({
	children,
}: React.PropsWithChildren): JSX.Element {
	const [client] = useState(new QueryClient());

	return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
