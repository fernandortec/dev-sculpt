import { authWithGithub } from "@/modules/auth/http/auth-with-github";
import { Hono } from "hono";

export const authRoutes = new Hono().route("/", authWithGithub);
