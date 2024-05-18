export class MustHavePasswordError extends Error {
	constructor() {
		super("User does not have a password set, use social login instead.");
	}
}
