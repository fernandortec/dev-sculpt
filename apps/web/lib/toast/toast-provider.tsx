import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ToasterClient } from "@/lib/toast/toast-client";

import { cookies } from "next/headers";

export function ToastProvider() {
	const cookie = cookies().get("toast");

	return (
		<>
			<SonnerToaster richColors />
			<ToasterClient toastData={cookie?.value} />
		</>
	);
}

export function setToast(
	type: "success" | "error" | "warning" | "info",
	message: string,
// biome-ignore lint/suspicious/noExplicitAny: 
): any {
	cookies().set("toast", JSON.stringify({ type, message }), {
		path: "/",
		expires: new Date(Date.now() + 1000),
	});
}
