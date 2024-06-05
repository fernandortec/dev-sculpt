"use client";

import { User } from "lucide-react";
import Image from "next/image";

export function Header(): JSX.Element {
	return (
		<header className="bg-black/10">
			<User
				onClick={() => {
					console.log("opaopa");
				}}
			/>
		</header>
	);
}
