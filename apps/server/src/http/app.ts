import { authLinksRoutes } from "@/http/routes/auth-links/_routes";
import { authRoutes } from "@/http/routes/auth/_routes";
import { userRoutes } from "@/http/routes/users/_routes";
import { Hono } from "hono";

export const app = new Hono()
	.route("/users", userRoutes)
	.route("/auth-links", authLinksRoutes)
	.route("/auth", authRoutes);
