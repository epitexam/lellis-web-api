import { Elysia, t } from "elysia";
import { CreateUserComposer } from "../../../infrastructure/user/services/user/CreateUserComposer";
import { authMiddleware } from "../../http/middleware/authMiddleware";
import { TokenProvider } from "../../../infrastructure/user/providers/TokenProvider";

const createUserBody = t.Object({
    last_name: t.String(),
    first_name: t.String(),
    email: t.String(),
    password: t.String(),
});

const tokenProvider = new TokenProvider(process.env.JWT_SECRET || "super_secret_key");

export const userRoutes = (app: Elysia) =>
    app.group("/users", (group) =>
        group
            .post(
                "/",
                async ({ body }) => {
                    const controller = CreateUserComposer();
                    const { last_name, first_name, email, password } = body;

                    const newUser = await controller.handle({
                        last_name,
                        first_name,
                        email,
                        password,
                    });

                    const token = await tokenProvider.generateToken({
                        uuid: newUser.uuid
                    });

                    return {
                        message: "User successfully created",
                        token,
                    };
                },
                { body: createUserBody }
            )
            .get(
                "/me",
                // @ts-ignore (cant solve this now)
                async ({ user }) => {
                    return { user: { uuid: user.uuid, email: user.email } };
                },
                { beforeHandle: [authMiddleware] }
            )

    );
