"use client";

import type * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import Icons from "@/public/assets/icons";

interface SignInFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: SignInFormProps) {
	return (
		<div {...props}>
			<form className={cn("grid gap-2", className)}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							placeholder="name@example.com"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
						/>
					</div>
					<Button>Criar com e-mail</Button>
				</div>
				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Ou continue com
						</span>
					</div>
				</div>
				<footer className="mt-4 grid gap-2">
					<Button variant="outline" type="button">
						<Icons.Github className="mr-2 h-4 w-4" />
						GitHub
					</Button>
					<Button variant="outline" type="button">
						<Icons.Linkedin className="mr-2 h-4 w-4" />
						Linkedin
					</Button>
					<Button variant="outline" type="button">
						<Icons.Google className="mr-2 h-4 w-4" />
						Google
					</Button>
				</footer>
			</form>
		</div>
	);
}
