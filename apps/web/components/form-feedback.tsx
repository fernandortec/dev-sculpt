import { cn } from "@/helpers/utils";
import { CheckCircle, TriangleAlertIcon } from "lucide-react";

interface FormFeedbackProps {
	message?: string;
	error?: string;
	className?: string;
}

export function FormFeedback({
	error,
	message,
	className,
}: FormFeedbackProps): JSX.Element {
	return (
		<>
			{message && (
				<div
					className={cn(
						"mt-2 flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-emerald-500 text-sm",
						className,
					)}
				>
					<CheckCircle className="h-4 w-4" />
					<p>{message}</p>
				</div>
			)}

			{error && (
				<div
					className={cn(
						"mt-2 flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-destructive text-sm",
						className,
					)}
				>
					<TriangleAlertIcon className="h-4 w-4" />
					<p>{error}</p>
				</div>
			)}
		</>
	);
}
