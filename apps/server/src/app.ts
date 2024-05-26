import { authRoutes } from "@/modules/auth/http";
import { userRoutes } from "@/modules/users/http";
import { Hono } from "hono";

export const app = new Hono().route("/", authRoutes).route("/", userRoutes);
