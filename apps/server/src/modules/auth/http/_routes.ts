import { authWithGithub } from "@/http/routes/auth/auth-with-github";
import { Hono } from "hono";

export const authRoutes = new Hono().route("/", authWithGithub);
