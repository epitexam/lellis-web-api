export class HashProvider {
    static async hash(password: string) {
        return Bun.password.hash(password)
    }

    static async compare(password: string, hashedPassword: string) {
        return Bun.password.verify(password, hashedPassword)
    }
}