import { createUser } from "@/http/routes/users/create-user";
import { Hono } from "hono";

export const userRoutes = new Hono().route("/", createUser);
