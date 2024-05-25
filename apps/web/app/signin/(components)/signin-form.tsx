"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Icons from "@/public/assets/icons";
import { authWithPassword } from "@/services/auth/auth-with-password";
import { generateOauthProviderUrl } from "@/services/auth/generate-oauth-provider-url";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import router from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const inputSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

type InputSchema = z.infer<typeof inputSchema>;
interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: SignInFormProps) {
	const router = useRouter();
	const form = useForm<InputSchema>({ resolver: zodResolver(inputSchema) });

	async function handleSignIn(data: InputSchema): Promise<unknown> {
		const { email, password } = data;
		const success = await authWithPassword(email, password);
		if (!success) return toast.error("Falha ao efetuar login!");

		toast.success("Login efetuado com sucesso!");
		return router.push("/dashboard");
	}

	async function handleGenerateOauthUrl(
		provider: "github" | "linkedin" | "google",
	): Promise<unknown> {
		const url = await generateOauthProviderUrl(provider);
		return router.push(url);
	}

	return (
		<div {...props}>
			<form
				onSubmit={form.handleSubmit(handleSignIn)}
				className={cn("grid gap-2", className)}
			>
				<div className="grid gap-2">
					<Form {...form}>
						<div className="grid gap-1">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="sr-only" htmlFor="email">
											Email
										</FormLabel>
										<FormControl>
											<Input
												id="email"
												placeholder="name@example.com"
												type="email"
												autoCapitalize="none"
												autoComplete="email"
												autoCorrect="off"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel className="sr-only" htmlFor="password">
											Senha
										</FormLabel>
										<FormControl>
											<Input
												id="password"
												placeholder="********"
												type="password"
												autoCapitalize="none"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</Form>
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
				<footer className="mt-4 grid gap-2">
					<Button
						variant="outline"
						type="button"
						onClick={() => handleGenerateOauthUrl("github")}
					>
						<Icons.Github className="mr-2 h-4 w-4" />
						GitHub
					</Button>
					<Button
						variant="outline"
						type="button"
						onClick={() => handleGenerateOauthUrl("linkedin")}
					>
						<Icons.Linkedin className="mr-2 h-4 w-4" />
						Linkedin
					</Button>
					<Button
						variant="outline"
						type="button"
						onClick={() => handleGenerateOauthUrl("google")}
					>
						<Icons.Google className="mr-2 h-4 w-4" />
						Google
					</Button>
				</footer>
			</form>
		</div>
	);
}
