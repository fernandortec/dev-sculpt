import type { OauthUser } from "@/modules/auth/schemas/oauth-user";

interface GetLinkedinUserUseCaseResponse {
	user: OauthUser;
}

export class GetLinkedinUserUseCase {
	async execute(accessToken: string): Promise<GetLinkedinUserUseCaseResponse> {
		const response = await fetch("https://api.linkedin.com/v2/userinfo", {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const user = await response.json();

		return {
			user: {
				avatarUrl: user.picture,
				email: user.email,
				name: user.name,
				id: user.sub,
			},
		};
	}
}
