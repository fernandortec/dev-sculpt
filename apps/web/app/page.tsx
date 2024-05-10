import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Icons from "@/public/assets/icons";
import {
	BriefcaseIcon,
	FlowerIcon,
	HeartIcon,
	LightbulbIcon,
	MountainSnow,
	SearchIcon,
	SettingsIcon,
} from "lucide-react";

export default function Page() {
	return (
		<>
			<main className="relative isolate h-screen overflow-hidden">
				<div className="-z-10 absolute inset-0 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
				<div className="-z-10 absolute inset-y-0 right-1/2 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-indigo-600/10 shadow-xl ring-1 ring-indigo-50 lg:mr-0 sm:mr-28 xl:mr-16 xl:origin-center" />

				<div className="container py-24 text-center lg:py-32">
					<h1 className="scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
						Dev Sculpt
					</h1>
					<p className="mt-3 text-muted-foreground text-xl">
						Procure empregos, faça testes e se construa!!
					</p>
					<div className="relative mx-auto mt-7 max-w-xl sm:mt-12">
						<form className="relative z-10 flex space-x-3 rounded-lg border bg-background p-3 shadow-lg">
							<div className="flex-[1_0_0%]">
								<Label htmlFor="job" className="sr-only">
									Procurar vagas
								</Label>
								<Input
									name="job"
									className="h-full focus-visible:ring-1"
									id="job"
									placeholder="Procurar por palavras chaves, Ex: Full Ftack, Designer..."
								/>
							</div>
							<Button size="icon">
								<span className="sr-only">Pesquisar</span>
								<SearchIcon />
							</Button>
						</form>

						<Icons.OrangeStripes />
						<Icons.BlueStripes />
					</div>
					<div className="mt-10 flex flex-wrap justify-center gap-2 sm:mt-20">
						<Button variant="outline">
							<BriefcaseIcon className="mr-2 h-auto w-3 flex-shrink-0" />
							Cargos de gerência
						</Button>
						<Button variant="outline">
							<SettingsIcon className="mr-2 h-auto w-3 flex-shrink-0" />
							Scrum master, QA
						</Button>
						<Button variant="outline">
							<HeartIcon className="mr-2 h-auto w-3 flex-shrink-0" />
							Desenvolvimento
						</Button>
						<Button variant="outline">
							<LightbulbIcon className="mr-2 h-auto w-3 flex-shrink-0" />
							Mobile
						</Button>
						<Button variant="outline">
							<FlowerIcon className="mr-2 h-auto w-3 flex-shrink-0" />
							Desktop
						</Button>
						<Button variant="outline">
							<MountainSnow className="mr-2 h-auto w-3 flex-shrink-0" />
							Análise de testes
						</Button>
					</div>
					<p className="mt-4 text-sm opacity-50">
						Tudo isso e muito mais você encontra aqui na <b>Dev Sculpt</b>
					</p>
				</div>
			</main>
		</>
	);
}
