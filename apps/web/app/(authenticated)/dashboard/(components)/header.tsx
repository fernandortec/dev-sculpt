import { CountriesDropdown } from "@/app/(components)/countries-dropdown";
import { UserDropdown } from "@/app/(components)/user-dropdown";
import { Input } from "@/components/ui/input";
import Icons from "@/public/assets/icons";
import Link from "next/link";

export function Header(): JSX.Element {
	return (
		<header className="flex items-center justify-between gap-20 px-40 py-4">
			<Icons.Logo className="h-12 w-12" />
			<Input placeholder="Buscar vagas" />
			<nav className="flex items-center gap-4 text-gray-700">
				<Link href="/" className="text-sm hover:text-black">
					Vagas
				</Link>
				<Link href="/" className="text-sm hover:text-black">
					Aplicações
				</Link>
				<Link href="/" className="text-sm hover:text-black">
					Empresas
				</Link>
			</nav>

			<CountriesDropdown />
			<UserDropdown />
		</header>
	);
}
