import { Elysia } from "elysia";
import { userRoutes } from "./presentation/elysia/user";
import { jwt } from "@elysiajs/jwt";
import { indexRoutes } from "./presentation/elysia";
import { isDomainError } from "./presentation/adapters/ElysiaErrorAdapter";
import { HttpStatusCodes } from "./application/interfaces/HttpStatusCodes";

const PORT = Number(process.env.PORT) || 3000;

export const app = new Elysia()

app.use(
  jwt({
    name: "jwt",
    secret: process.env.JWT_SECRET || "super_secret_key",
  })
);

app.onError(({ error, set }) => {

  if (isDomainError(error)) {
    set.status = error.statusCode;
    return {
      type: error.type,
      message: error.message,
    };
  }

  if (error instanceof Error) {
    set.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    return {
      type: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      message: error.message,
    };
  }

  set.status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  return {
    type: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    message: "An unexpected error occurred",
  };
});

app.get('/health', () => ({
  status: 'ok',
  timestamp: new Date().toISOString(),
  uptime: process.uptime()
}))

app.use(indexRoutes)
app.use(userRoutes)
app.listen(PORT);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
