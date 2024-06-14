import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";

export function UserDropdown(): JSX.Element {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<User />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Minha conta</DropdownMenuLabel>
				<DropdownMenuSeparator />

				<Link href="/dashboard/profile">
					<DropdownMenuItem className="cursor-pointer">Perfil</DropdownMenuItem>
				</Link>
				<Link href="/dashboard/applications">
					<DropdownMenuItem className="cursor-pointer">
						Aplicações
					</DropdownMenuItem>
				</Link>
				<Link href="/dashboard/settings">
					<DropdownMenuItem className="cursor-pointer">
						Configurações
					</DropdownMenuItem>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
