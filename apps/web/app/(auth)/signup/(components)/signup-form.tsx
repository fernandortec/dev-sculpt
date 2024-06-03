"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { createUser } from "@/services/user/create-user/create-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signupSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	role: z.enum(["jobseeker", "recruiter"]),
});

type SignupSchema = z.infer<typeof signupSchema>;

export function SignUpForm(): JSX.Element {
	const router = useRouter();
	const form = useForm<SignupSchema>({
		resolver: zodResolver(signupSchema),
		defaultValues: { email: "", name: "", password: " ", role: "jobseeker" },
	});

	async function handleSignup(data: SignupSchema): Promise<unknown> {
		const { email, name, password, role } = data;

		const response = await createUser({
			email,
			name,
			password,
			role: role === "jobseeker" ? "jobseeker" : "recruiter",
			avatarUrl: "https://somefakeurl.com",
		});

		if (response.error) return toast.error("Credenciais inválidas!");

		toast.success('Usuário criado com sucesso!');
		router.push("/dashboard");
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSignup)}>
				<Separator asChild className="my-3 bg-background">
					Ou
				</Separator>
				<div className="mt-5 grid grid-cols-2 gap-4">
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Nome e sobrenome" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input placeholder="Email" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem className="col-span-2">
								<FormControl>
									<Input
										placeholder="Senha"
										type="password"
										className="col-span-2"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="role"
						render={({ field }) => (
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<SelectTrigger className="col-span-2 opacity-80">
									<SelectValue placeholder="Como utilizará nossos serviços?" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectItem value="jobseeker">
											Estou procurando
											<span className="font-medium"> oportunidades</span>
										</SelectItem>
										<SelectItem value="recruiter">
											Estou procurando
											<span className="font-medium"> talentos</span>
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						)}
					/>

					<Button
						className="col-span-2 mt-3"
						disabled={form.formState.isSubmitting}
					>
						Começar
					</Button>
				</div>
			</form>
		</Form>
	);
}
