interface DefaultServiceResponse {
	message?: string;
	error?: string;
}

type DataServiceResponse<T> = T;

export type PlainServiceResponse<T = void> = T extends void
	? DefaultServiceResponse
	: DataServiceResponse<T>;

export interface ServiceResponse<T> {
	error?: string;
	content?: T;
}
