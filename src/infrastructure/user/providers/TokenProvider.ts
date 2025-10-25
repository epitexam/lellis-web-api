import { jwt } from "@elysiajs/jwt";
import { ITokenProvider } from "../../../domain/user/security/ITokenProvider";

export class TokenProvider implements ITokenProvider {
    private jwtInstance: ReturnType<typeof jwt>;

    constructor(secret: string) {
        if (!secret) {
            throw new Error("JWT secret must be provided");
        }

        this.jwtInstance = jwt({
            name: "jwt",
            secret,
            exp: "1h",
        });
    }

    async generateToken(
        payload: Record<string, any>,
        expiresIn: string | number = "1h"
    ): Promise<string> {
        return this.jwtInstance.sign(payload, { expiresIn });
    }

    async verifyToken<T = Record<string, any>>(token: string): Promise<T | null> {
        try {
            const payload = await this.jwtInstance.verify(token);
            return payload as T;
        } catch {
            return null;
        }
    }
}
