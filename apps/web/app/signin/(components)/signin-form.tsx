"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authWithPassword } from "@/services/auth/auth-with-password";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const inputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

type InputSchema = z.infer<typeof inputSchema>;

export function SignInForm() {
	const router = useRouter();
	const [_, formAction] = useActionState(submitAction, {
		email: "",
		password: "",
	});

	async function submitAction(
		prevState: InputSchema,
		formData: FormData,
	): Promise<InputSchema> {
		const email = String(formData.get("email"));
		const password = String(formData.get("password"));
		const { success } = inputSchema.safeParse({ email, password });

		if (!success) {
			toast.error("Dados inválidos!");
			return prevState;
		}

		const authSuccessfull = await authWithPassword(email, password);
		
		if (!authSuccessfull) {
			toast.error("Dados inválidos!");
			return prevState;
		}

		toast.success("Login efetuado com sucesso!");
		router.push("/dashboard");

		return { email, password };
	}

	return (
		<form action={formAction} className={"grid gap-2"}>
			<div className="grid gap-2">
				<div className="grid gap-1">
					<div>
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							name="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
						/>
					</div>
					<div>
						<Label className="sr-only" htmlFor="password">
							Senha
						</Label>
						<Input
							id="password"
							name="password"
							placeholder="********"
							type="password"
							autoCapitalize="none"
							autoComplete="current-password"
							autoCorrect="off"
						/>
					</div>
				</div>
				<Button type="submit">Continuar</Button>
			</div>

			<div className="relative text-gray-500">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Ou continue com
					</span>
				</div>
			</div>
		</form>
	);
}
