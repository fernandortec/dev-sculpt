import { createUser } from "@/modules/users/http/create-user/create-user";
import { getUser } from "@/modules/users/http/get-user/get-user";
import { Hono } from "hono";

export const userRoutes = new Hono().route("/", createUser).route("/", getUser);
