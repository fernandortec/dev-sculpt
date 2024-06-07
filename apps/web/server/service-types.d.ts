interface DefaultServiceResponse {
	message?: string;
	error?: string;
}

type DataServiceResponse<T> = T

export type ServiceResponse<T = void> = T extends void
	? DefaultServiceResponse
	: DataServiceResponse<T>;
