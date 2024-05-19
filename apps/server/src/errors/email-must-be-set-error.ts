export class EmailMustBeSetError extends Error {
	constructor() {
		super("Oauth account must have an email");
	}
}
