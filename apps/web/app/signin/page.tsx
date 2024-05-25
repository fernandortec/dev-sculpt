import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Icons from "@/public/assets/icons";
import { SignInForm } from "@/signin/(components)/signin-form";
import Link from "next/link";

export default function AuthenticationPage() {
	return (
		<div className="container relative grid h-screen items-center justify-center lg:grid-cols-2">
			<Link
				href="/examples/authentication"
				className={cn(
					buttonVariants({ variant: "ghost" }),
					"absolute top-4 right-4 md:top-8 md:right-8",
				)}
			>
				Login
			</Link>
			<aside className="relative h-full flex-col p-10 text-white lg:flex dark:border-r">
				<div className="absolute inset-0 bg-zinc-900" />
				<header className="relative z-20 flex items-center font-medium text-lg">
					<Icons.Logo />
					Dev Sculpt
				</header>
				<div className="relative z-20 mt-auto">
					<blockquote className="space-y-2">
						<p className="text-lg">
							&ldquo;This library has saved me countless hours of work and
							helped me deliver stunning designs to my clients faster than ever
							before.&rdquo;
						</p>
						<footer className="text-sm">Sofia Davis</footer>
					</blockquote>
				</div>
			</aside>
			<main className="w-full p-8 lg:p-0">
				<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[28rem]">
					<header className="flex flex-col space-y-2 text-center">
						<h1 className="font-semibold text-2xl tracking-tight">
							Logar agora
						</h1>
						<p className="text-muted-foreground text-sm">
							Preencha seu e-mail abaixo para entrar, ou use uma das redes.
						</p>
					</header>

					<SignInForm />

					<p className="px-8 text-center text-muted-foreground text-sm">
						Clicando em continuar, você concorda com nossos,{" "}
						<Link
							href="/terms"
							className="underline underline-offset-4 hover:text-primary"
						>
							Termos de serviço
						</Link>{" "}
						e{" "}
						<Link
							href="/privacy"
							className="underline underline-offset-4 hover:text-primary"
						>
							Políticas de privacidade
						</Link>
						.
					</p>
				</div>
			</main>
		</div>
	);
}
