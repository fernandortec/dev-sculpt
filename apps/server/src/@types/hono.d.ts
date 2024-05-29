import type { TypedResponse } from "hono";

export interface JSONResponse<T> extends TypedResponse<T, StatusCode, "json"> {}
export interface OverrideDate<T> extends Omit<T, "createdAt"> {
	createdAt: string;
}