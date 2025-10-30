import { Elysia } from "elysia";
import { registerUserRoutes } from "./presentation/elysia/user";
import { jwt } from "@elysiajs/jwt";

const PORT = Number(process.env.PORT) || 3000;

export const app = new Elysia()

app.use(
    jwt({
        name: "jwt",
        secret: process.env.JWT_SECRET || "super_secret_key",
    })
);

app.use(registerUserRoutes)
app.listen(PORT);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
