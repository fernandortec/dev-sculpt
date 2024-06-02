"use client";

import { Button } from "@/components/ui/button";
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
import { safeParser } from "@/helpers/safe-parser";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { createUser } from "../../../../server/services/user/create-user";

const signupSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	password: z.string().min(8),
	role: z.string(),
});

type SignupSchema = z.infer<typeof signupSchema>;

export function SignUpForm(): JSX.Element {
	const router = useRouter();
	const [_, submitAction, isPending] = useActionState(handleSignup, {
		name: "",
		email: "",
		password: "",
		role: "jobseeker",
	});

	async function handleSignup(
		prevState: SignupSchema,
		formData: FormData,
	): Promise<SignupSchema> {
		const rawData = Object.fromEntries(formData.entries());
		const { data } = safeParser(signupSchema, rawData);

		const { email, name, password, role } = data;

		await createUser({
			email,
			name,
			password,
			role: role === "jobseeker" ? "jobseeker" : "recruiter",
			avatarUrl: "https://somefakeurl.com",
		});

		toast.success("Conta criada com sucesso");
		router.push("/dashboard");

		return prevState;
	}

	return (
		<form action={submitAction}>
			<Separator asChild className="my-3 bg-background">
				<div className="flex items-center py-3 text-muted-foreground text-xs uppercase after:ms-6 before:me-6 after:flex-[1_1_0%] before:flex-[1_1_0%] after:border-gray-200 before:border-gray-200 dark:after:border-gray-700 dark:before:border-gray-700 after:border-t before:border-t">
					Ou
				</div>
			</Separator>
			<div className="mt-5 grid grid-cols-2 gap-4">
				<Input placeholder="Nome e sobrenome" name="name" required />
				<Input placeholder="Email" name="email" required />
				<Input
					placeholder="Senha"
					className="col-span-2"
					name="password"
					type="password"
					required
				/>
				<Select name="role" required>
					<SelectTrigger className="col-span-2 opacity-80">
						<SelectValue placeholder="Como utilizará nossos serviços?" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectItem value="jobseeker">
								Estou procurando{" "}
								<span className="font-medium">oportunidades</span>
							</SelectItem>
							<SelectItem value="recruiter">
								Estou procurando <span className="font-medium">talentos</span>
							</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>

				<Button className="col-span-2 mt-3" disabled={isPending}>
					Começar
				</Button>
			</div>
		</form>
	);
}
