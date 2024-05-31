import type { TypedResponse } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export interface JSONResponse<T> extends TypedResponse<T, StatusCode, "json"> {}
