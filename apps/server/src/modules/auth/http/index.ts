import { authWithGithub } from "@/modules/auth/http/auth-with-github/auth-with-github";
import { authWithGoogle } from "@/modules/auth/http/auth-with-google/auth-with-google";
import { authWithLinkedin } from "@/modules/auth/http/auth-with-linkedin/auth-with-linkedin";
import { authWithPassword } from "@/modules/auth/http/auth-with-password/auth-with-password";
import { generateGithubAuthUrl } from "@/modules/auth/http/generate-github-auth-url/generate-github-auth-url";

import { generateGoogleAuthUrl } from "@/modules/auth/http/generate-google-auth-url/generate-google-auth-url";
import { generateLinkedinAuthUrl } from "@/modules/auth/http/generate-linkedin-auth-url/generate-linkedin-auth-url";
import { Hono } from "hono";

export const authRoutes = new Hono()
	.route("/", authWithGithub)
	.route("/", authWithPassword)
	.route("/", generateGoogleAuthUrl)
	.route("/", generateLinkedinAuthUrl)
	.route("/", generateGithubAuthUrl)
	.route("/", authWithGoogle)
	.route("/", authWithLinkedin);
