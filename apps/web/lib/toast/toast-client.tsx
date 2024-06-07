"use client";

import { cookies } from "next/headers";
import { useEffect } from "react";
import { toast } from "sonner";

interface ToasterClientProps {
	toastData?: string;
}

export function ToasterClient({ toastData }: ToasterClientProps) {
	useEffect(() => {
		if (toastData) {
			const { type, message } = JSON.parse(toastData);

			switch (type) {
				case "success":
					toast.success(message);
					break;
				case "error":
					toast.error(message);
					break;
				case "info":
					toast.info(message);
					break;
				case "warning":
					toast.warning(message);
					break;
				default:
					toast.info(message);
					break;
			}
		}
	}, [toastData]);

	return null;
}
