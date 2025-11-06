import { IUsersRepository } from "../../../application/repositories/IUsersRepository";
import { DeleteUserUseCase } from "../../../application/useCases/user/DeleteUser/DeleteUserUseCase";
import { IDeleteUserUseCase } from "../../../application/useCases/user/DeleteUser/IDeleteUserUseCase";
import { DeleteUserController } from "../../../presentation/http/controller/user/DeleteUserController";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";

export function DeleteUserComposer() {
    const repository: IUsersRepository = new PrismaUserRepository();
    const useCase: IDeleteUserUseCase = new DeleteUserUseCase(repository);
    const controller = new DeleteUserController(useCase);

    return controller
}