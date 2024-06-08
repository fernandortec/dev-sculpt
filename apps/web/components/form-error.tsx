import { TriangleAlertIcon } from "lucide-react";

interface FormErrorProps {
	message?: string;
}

export function FormError({ message }: FormErrorProps): JSX.Element {
	if (!message) return <></>;

	return (
		<div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-destructive text-sm">
			<TriangleAlertIcon className="h-4 w-4" />
			<p>{message}</p>
		</div>
	);
}
