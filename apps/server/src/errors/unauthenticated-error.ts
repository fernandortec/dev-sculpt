export class UnauthenticatedError extends Error {
	constructor() {
		super("User is not authenticated.");
	}
}
