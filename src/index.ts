import { Elysia } from "elysia";
import { authMiddleware } from "./presentation/http/middleware/authMiddleware";

const PORT = Number(process.env.PORT) || 3000;

export const app = new Elysia()
    .group('/user', (app) =>
        app
            .post('/sign-in', () => 'Sign in')
            .post('/sign-up', () => 'Sign up')
            .post('/profile', () => 'Profile')
            .get("/profile", () => {},{
                beforeHandle: [authMiddleware]
            })
    )



app.listen(PORT);

console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
