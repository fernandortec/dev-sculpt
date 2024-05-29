import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

export function SignUpForm(): JSX.Element {
	return (
		<form>
			<Separator asChild className="my-3 bg-background">
				<div className="flex items-center py-3 text-muted-foreground text-xs uppercase after:ms-6 before:me-6 after:flex-[1_1_0%] before:flex-[1_1_0%] after:border-gray-200 before:border-gray-200 dark:after:border-gray-700 dark:before:border-gray-700 after:border-t before:border-t">
					Ou
				</div>
			</Separator>
			<div className="mt-5 grid grid-cols-2 gap-4">
				<Input placeholder="Nome e sobrenome" />
				<Input placeholder="Email" />
				<Input placeholder="Senha" className="col-span-2" />
				<Select defaultValue="jobseeker">
					<SelectTrigger className="col-span-2 opacity-80">
						<SelectValue>Como utilizará nossos serviços: </SelectValue>
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="jobseeker">
							Estou procurando{" "}
							<span className="font-medium">oportunidades</span>
						</SelectItem>
						<SelectItem value="recruiter">
							Estou procurando <span className="font-medium">talentos</span>
						</SelectItem>
					</SelectContent>
				</Select>

				<Button className="col-span-2 mt-3">Iniciar</Button>
			</div>
		</form>
	);
}
