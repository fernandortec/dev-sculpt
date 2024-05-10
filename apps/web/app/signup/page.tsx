import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import Icons from "@/public/assets/icons";

import Link from "next/link";

export default function HeroFormSignUpForm() {
	return (
		<main className="relative bg-gradient-to-bl from-primary-foreground via-primary-foreground to-background px-10 md:px-40">
			<div className="container grid items-start gap-8 py-24 md:grid-cols-2 lg:gap-12 sm:py-32">
				<>
					<p className="inline-block bg-gradient-to-l from-blue-600 to-violet-500 bg-clip-text font-medium text-sm text-transparent dark:from-blue-400 dark:to-violet-400">
						A visão para 2024
					</p>
					<div className="mt-4 max-w-2xl md:mb-12">
						<h1 className="mb-4 scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
							Dev Sculpt: Se transforme
						</h1>
						<p className="text-muted-foreground text-xl">
							Experience limitless possibilities with our cutting-edge cloud
							solutions.
						</p>
					</div>
					<blockquote className="relative hidden max-w-sm md:block">
						<Icons.Quote />
						<div className="relative z-10">
							<p className="text-xl italic">
								Amazing people to work with. Very fast and professional partner.
							</p>
						</div>
						<footer className="mt-3 flex items-center">
							<div className="ms-4 grow">
								<span className="font-semibold">Emily Torres</span>
								<p className="text-muted-foreground text-xs">
									Chief Technology Officer | Skyward SaaS
								</p>
							</div>
						</footer>
					</blockquote>
				</>
				<div>
					<form>
						<div className="ms-auto lg:mx-auto lg:me-0 lg:max-w-lg">
							<Card>
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
									<Button className="w-full" variant={"outline"}>
										<Icons.Google />
										Cadastrar com Google
									</Button>
									<Button
										className="mt-2 w-full hover:text-[#0b66c3]"
										variant={"outline"}
									>
										<Icons.Linkedin />
										Cadastrar com LinkedIn
									</Button>
									<Button
										className="mt-2 w-full hover:text-[#1f3150]"
										variant={"outline"}
									>
										<Icons.Github />
										Cadastrar com LinkedIn
									</Button>
									<Separator asChild className="my-3 bg-background">
										<div className="flex items-center py-3 text-muted-foreground text-xs uppercase after:ms-6 before:me-6 after:flex-[1_1_0%] before:flex-[1_1_0%] after:border-gray-200 before:border-gray-200 dark:after:border-gray-700 dark:before:border-gray-700 after:border-t before:border-t">
											Ou
										</div>
									</Separator>
									<div className="mt-5 grid grid-cols-2 gap-4">
										<Input placeholder="Nome e sobrenome" />
										<Input placeholder="Email" />
										<Select defaultValue="jobseeker">
											<SelectTrigger className="col-span-2 opacity-80">
												<SelectValue>
													Como utilizará nossos serviços:{" "}
												</SelectValue>
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="jobseeker">
													Estou procurando{" "}
													<span className="font-medium">oportunidades</span>
												</SelectItem>
												<SelectItem value="recruiter">
													Estou procurando{" "}
													<span className="font-medium">talentos</span>
												</SelectItem>
											</SelectContent>
										</Select>

										<Button className="col-span-2 mt-3">Iniciar</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</form>
				</div>
				<footer className="mt-6 flex items-center gap-x-1.5 py-3 text-muted-foreground text-sm after:ms-6 md:mt-12 after:flex-[1_1_0%] after:border-t after:border-t-muted-foreground/50">
					<span className="bg-gradient-to-l from-blue-600 to-violet-500 bg-clip-text font-semibold text-transparent dark:from-blue-400 dark:to-violet-400">
						50,000
					</span>
					individuals and companies trust Cloud Unleashed
				</footer>
			</div>
		</main>
	);
}
