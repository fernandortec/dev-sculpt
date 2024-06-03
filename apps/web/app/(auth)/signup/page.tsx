import { SocialLoginsForm } from "@/(auth)/(components)/social-logins-form";
import { SignUpForm } from "@/(auth)/signup/(components)/signup-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import Icons from "@/public/assets/icons";
import Link from "next/link";

export default function SignUpPage() {
	return (
		<main className="relative bg-gradient-to-bl from-primary-foreground via-primary-foreground to-background px-10 md:px-40">
			<div className="container grid items-start gap-8 py-24 md:grid-cols-2 lg:gap-12 sm:py-32">
				<aside>
					<p className="inline-block bg-gradient-to-l from-blue-600 to-violet-500 bg-clip-text font-medium text-sm text-transparent dark:from-blue-400 dark:to-violet-400">
						A visão para 2024
					</p>
					<div className="mt-4 max-w-2xl md:mb-12">
						<h1 className="mb-4 scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
							Dev Sculpt: Se transforme
						</h1>
						<p className="text-muted-foreground text-xl">
							Experience limitless possibilities with our cutting-edge cloud
							solutions.  {" "}
						</p>
					</div>
					<blockquote className="relative hidden max-w-sm md:block">
						<Icons.Quote />
						<p className="relative z-10text-xl italic">
							Amazing people to work with. Very fast and professional partner.
						</p>
						<footer className="mt-3 flex items-center">
							<div className="ms-4 grow">
								<span className="font-semibold">Emily Torres</span>
								<p className="text-muted-foreground text-xs">
									Chief Technology Officer | Skyward SaaS
								</p>
							</div>
						</footer>
					</blockquote>
				</aside>
				<Card className="ms-auto lg:mx-auto lg:me-0 lg:max-w-lg">
					<CardHeader className="text-center">
						<h2 className="font-semibold text-2xl leading-none tracking-tight">
							Procure empregos agora
						</h2>
						<CardDescription>
							Já tem uma conta?{" "}
							<Link
								className="text-primary underline-offset-4 hover:underline"
								href="/signin"
							>
								Logar aqui
							</Link>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<SocialLoginsForm />
						<SignUpForm />
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
