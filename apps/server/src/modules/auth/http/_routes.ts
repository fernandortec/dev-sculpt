import { authWithGithub } from "@/modules/auth/http/auth-with-github";
import { authWithPassword } from "@/modules/auth/http/auth-with-password";
import { Hono } from "hono";

export const authRoutes = new Hono()
	.route("/", authWithGithub)
	.route("/", authWithPassword);
