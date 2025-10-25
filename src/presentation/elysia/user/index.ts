import { t, Elysia } from "elysia";
import { CreateUserComposer } from "../../../infrastructure/user/services/CreateUserComposer";
import { authMiddleware } from "../../http/middleware/authMiddleware";

// Tu peux même typer/valider ton body ici
const createUserBody = t.Object({
    last_name: t.String(),
    first_name: t.String(),
    email: t.String(),
    password: t.String(),
});

export const registerUserRoutes = (app: Elysia) => {
    const userGroup = app.group("/users", (group) => {
        group.post("/", async ({ body }) => {
            const controller = CreateUserComposer();
            const { last_name, first_name, email, password } = body;
            return controller.handle({ last_name, first_name, email, password });
        }, {
            body: createUserBody,
            beforeHandle: [authMiddleware]
        });

        group.get("/", async () => ({ message: "bonjour" }), {
            beforeHandle: [authMiddleware]
        });

        group.get("/test", async () => ({ message: "test" }), {

        });

        return group;
    });

    return userGroup;
};
