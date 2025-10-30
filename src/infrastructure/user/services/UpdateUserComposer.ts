import { IPasswordHasher } from "../../../application/providers/IPasswordHasher";
import { IUsersRepository } from "../../../application/repositories/IUsersRepository";
import { PasswordHasher } from "../providers/HashProviser";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";

export function UpdateUserComposer() {
    const repository: IUsersRepository = new PrismaUserRepository();
    const passwordHasher: IPasswordHasher = new PasswordHasher();
}