import { userRoutes } from "@/http/routes/users/routes";
import { Hono } from "hono";

export const app = new Hono().route("/", userRoutes);
