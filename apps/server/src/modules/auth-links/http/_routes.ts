import { authFromLink } from "@/modules/auth-links/http/auth-from-link";
import { sendAuthLink } from "@/modules/auth-links/http/send-auth-link";
import { Hono } from "hono";

export const authLinksRoutes = new Hono()
	.route("/", sendAuthLink)
	.route("/", authFromLink);
