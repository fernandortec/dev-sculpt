export class OauthCodeInvalidError extends Error {
	constructor() {
		super("Oauth code invalid!");
	}
}
