import { jwt } from "@elysiajs/jwt";
import { ITokenProvider } from "../../../domain/user/security/ITokenProvider";

export class TokenProvider implements ITokenProvider {
    private jwtInstance: ReturnType<typeof jwt>;

    constructor(secret: string) {
        this.jwtInstance = jwt({
            name: "jwt",
            secret: secret|| "default_secret",
            exp: "1h",
        });
    }

    async generateToken(payload: Record<string, any>, expiresIn: string | number = "1h"): Promise<string> {
        return this.jwtInstance.sign(payload);
    }

    async verifyToken(token: string): Promise<Record<string, any> | null> {
        try {
            const payload = await this.jwtInstance.verify(token);
            return payload as Record<string, any>;
        } catch {
            return null;
        }
    }
}
