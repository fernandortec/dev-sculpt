import { authWithGithub } from "@/modules/auth/http/auth-with-github";
import { authWithPassword } from "@/modules/auth/http/auth-with-password";
import { generateGoogleAuthUrl } from "@/modules/auth/http/generate-google-auth-url";
import { Hono } from "hono";

export const authRoutes = new Hono()
	.route("/", authWithGithub)
	.route("/", authWithPassword)
	.route("/", generateGoogleAuthUrl);
