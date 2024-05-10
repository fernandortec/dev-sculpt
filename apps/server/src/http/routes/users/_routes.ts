import { createUser } from "@/http/routes/users/create-user";
import { getUser } from "@/http/routes/users/get-user";
import { Hono } from "hono";

export const userRoutes = new Hono().route("/", createUser).route("/", getUser);
