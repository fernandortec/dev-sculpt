"use client";

import { Button } from "@/components/ui/button";
import Icons from "@/public/assets/icons";
import { generateOauthProviderUrl } from "@/services/auth/generate-oauth-provider-url";
import { useRouter } from "next/navigation";
import { useActionState } from "react";

export function SocialLoginsForm(): JSX.Element {
	const router = useRouter();
	const [_, formAction, isPending] = useActionState(submitAction, "");

	async function submitAction(_: string, formData: FormData) {
		const githubPressed = formData.get("github");
		const linkedinPressed = formData.get("linkedin");
		const googlePressed = formData.get("google");

		const provider = String(githubPressed || linkedinPressed || googlePressed);

		const url = await generateOauthProviderUrl(provider);
		router.push(url);

		return provider;
	}

	return (
		<form action={formAction} className="grid gap-2">
			<Button
				disabled={isPending}
				variant="outline"
				type="submit"
				name="github"
				value="github"
			>
				<Icons.Github className="mr-2 h-4 w-4" />
				GitHub
			</Button>
			<Button
				disabled={isPending}
				variant="outline"
				type="submit"
				name="linkedin"
				value="linkedin"
			>
				<Icons.Linkedin className="mr-2 h-4 w-4" />
				Linkedin
			</Button>
			<Button
				disabled={isPending}
				variant="outline"
				type="submit"
				name="google"
				value="google"
			>
				<Icons.Google className="mr-2 h-4 w-4" />
				Google
			</Button>
		</form>
	);
}
