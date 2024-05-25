import { authRoutes } from "@/modules/auth/http/_routes";
import { userRoutes } from "@/modules/users/http/_routes";
import { Hono } from "hono";

export const app = new Hono().route("/", authRoutes).route("/", userRoutes);
