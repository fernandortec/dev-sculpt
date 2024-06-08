import { cn } from "@/helpers/utils";
import { CheckCircle } from "lucide-react";

interface FormSuccessProps {
	message?: string;
	className?: string;
}

export function FormSuccess({
	message,
	className,
}: FormSuccessProps): JSX.Element {
	if (!message) return <></>;

	return (
		<div
			className={cn(
				"mt-2 flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-emerald-500 text-sm",
				className,
			)}
		>
			<CheckCircle className="h-4 w-4" />
			<p>{message}</p>
		</div>
	);
}
