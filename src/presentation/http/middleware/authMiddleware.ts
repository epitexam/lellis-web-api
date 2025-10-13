import { TokenProvider } from "../../../infrastructure/user/providers/TokenProvider";

const tokenProvider = new TokenProvider(Bun.env.JWT_SECRET!);

export const authMiddleware = async ({ request, set }: any) => {
    const authHeader = request.headers.get("authorization");

    if (!authHeader) {
        set.status = 401;
        return { error: "Missing Authorization header" };
    }

    const token = authHeader.replace("Bearer ", "");
    const payload = await tokenProvider.verifyToken(token);

    if (!payload) {
        set.status = 401;
        return { error: "Invalid or expired token" };
    }

    // on peut stocker le user dans le contexte (Elysia autorise le set local)
    return { user: payload };
};
