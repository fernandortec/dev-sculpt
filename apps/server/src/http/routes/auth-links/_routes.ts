import { authFromLink } from "@/http/routes/auth-links/auth-from-link";
import { sendAuthLink } from "@/http/routes/auth-links/send-auth-link";
import { Hono } from "hono";

export const authLinksRoutes = new Hono()
	.route("/", sendAuthLink)
	.route("/", authFromLink);
