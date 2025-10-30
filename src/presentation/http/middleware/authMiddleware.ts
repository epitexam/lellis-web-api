import type { Context } from "elysia";

export const authMiddleware = async (ctx: Context) => {
    const { request, set } = ctx;

    const jwt = (ctx as any).jwt;

    const authHeader = request.headers.get("authorization");
    if (!authHeader) {
        set.status = 401;
        return { message: "Missing Authorization header" };
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        set.status = 401;
        return { message: "Missing token" };
    }

    const payload = await jwt.verify(token);
    if (!payload) {
        set.status = 401;
        return { message: "Invalid or expired token" };
    }

    return { user: payload };
};
