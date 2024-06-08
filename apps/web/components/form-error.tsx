import { cn } from "@/helpers/utils";
import { TriangleAlertIcon } from "lucide-react";

interface FormErrorProps {
	message?: string;
	className?: string;
}

export function FormError({ message, className }: FormErrorProps): JSX.Element {
	if (!message) return <></>;

	return (
		<div
			className={cn(
				"mt-2 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-destructive text-sm",
				className,
			)}
		>
			<TriangleAlertIcon className="h-4 w-4" />
			<p>{message}</p>
		</div>
	);
}
