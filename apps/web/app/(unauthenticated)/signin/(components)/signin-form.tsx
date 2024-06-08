"use client";

import {
	type SigninInputSchema,
	signinInputSchema,
} from "@/(unauthenticated)/signin/validators";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
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
import { authWithPassword } from "@/services/auth/auth-with-password/auth-with-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function SignInForm() {
	const router = useRouter();
	const form = useForm<SigninInputSchema>({
		resolver: zodResolver(signinInputSchema),
		defaultValues: { email: "", password: "" },
	});

	const { data, mutateAsync: authWithPasswordFn } = useMutation({
		mutationFn: authWithPassword,
	});

	async function handleSignIn({
		email,
		password,
	}: SigninInputSchema): Promise<void> {
		const { error } = await authWithPasswordFn({ email, password });
		if (!error) router.push("/dashboard");
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSignIn)} className={"grid gap-2"}>
				<div className="grid gap-2">
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
											autoComplete="current-password"
											autoCorrect="off"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type="submit" disabled={form.formState.isSubmitting}>
						Continuar
					</Button>
				</div>

				<FormError className="mt-0" message={data?.error} />
				<FormSuccess className="mt-0" message={data?.message} />

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
		</Form>
	);
}
