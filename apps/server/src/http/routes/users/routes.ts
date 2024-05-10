import { authLinksRoutes } from "@/http/routes/auth-links/routes";
import { createUser } from "@/http/routes/users/create-user";
import { Hono } from "hono";

export const userRoutes = new Hono()
	.route("/users", createUser)
	.route("/auth-links", authLinksRoutes);
