import { IPasswordHasher } from "../../../application/providers/IPasswordHasher";
import { IUsersRepository } from "../../../application/repositories/IUsersRepository";
import { CreateUserUseCase } from "../../../application/useCases/user/CreateUser/CreateUserUseCase";
import { ICreateUserUseCase } from "../../../application/useCases/user/CreateUser/ICreateUserUseCase";
import { CreateUserController } from "../../../presentation/http/user/CreateUserController";
import { PasswordHasher } from "../providers/HashProviser";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";

export function CreateUserComposer() {
    const repository: IUsersRepository = new PrismaUserRepository();
    const passwordHasher: IPasswordHasher = new PasswordHasher();
    const useCase: ICreateUserUseCase = new CreateUserUseCase(repository, passwordHasher);
    const controller = new CreateUserController(useCase);

    return controller
}