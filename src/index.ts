import { Elysia } from "elysia";
import { registerUserRoutes } from "./presentation/elysia/user";

const PORT = Number(process.env.PORT) || 3000;

export const app = new Elysia()

app.use(registerUserRoutes)
app.listen(PORT);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
