export class EmailMustBeSetError extends Error {
	constructor() {
		super("Github account must have an email");
	}
}
