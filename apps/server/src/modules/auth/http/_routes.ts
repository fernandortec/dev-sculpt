import { authWithGithub } from "@/modules/auth/http/auth-with-github";
import { authWithGoogle } from "@/modules/auth/http/auth-with-google";
import { authWithLinkedin } from "@/modules/auth/http/auth-with-linkedin";
import { authWithPassword } from "@/modules/auth/http/auth-with-password";
import { generateGoogleAuthUrl } from "@/modules/auth/http/generate-google-auth-url";
import { Hono } from "hono";

export const authRoutes = new Hono()
	.route("/", authWithGithub)
	.route("/", authWithPassword)
	.route("/", generateGoogleAuthUrl)
	.route("/", authWithGoogle)
	.route("/", authWithLinkedin);
