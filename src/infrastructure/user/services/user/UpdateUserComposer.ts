import { IPasswordHasher } from "../../../../application/providers/IPasswordHasher";
import { IUsersRepository } from "../../../../application/repositories/IUsersRepository";
import { IUpdateUserUseCase } from "../../../../application/useCases/user/updateUser/IUpdateUserUseCase";
import { UpdateUserUseCase } from "../../../../application/useCases/user/updateUser/UpdateUserUseCase";
import { UpdateUserController } from "../../../../presentation/http/controller/user/UpdateUserController";
import { PasswordHasher } from "../../providers/HashProviser";
import { PrismaUserRepository } from "../../repositories/prisma/PrismaUserRepository";

export function UpdateUserComposer() {
    const repository: IUsersRepository = new PrismaUserRepository();
    const passwordHasher: IPasswordHasher = new PasswordHasher();
    const useCase: IUpdateUserUseCase = new UpdateUserUseCase(repository, passwordHasher);
    const controller = new UpdateUserController(useCase)

    return controller
}