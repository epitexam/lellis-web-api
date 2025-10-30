import { IPasswordHasher } from "../../../application/providers/IPasswordHasher"

export class PasswordHasher implements IPasswordHasher {
    async hashPassword(password: string) {
        return Bun.password.hash(password)
    }

    async comparePassword(password: string, hashedPassword: string) {
        return Bun.password.verify(password, hashedPassword)
    }
}