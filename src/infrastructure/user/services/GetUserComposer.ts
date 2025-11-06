import { IUsersRepository } from "../../../application/repositories/IUsersRepository";
import { GetUserCase } from "../../../application/useCases/user/GetUser/GetUserUseCase";
import { IGetUserUseCase } from "../../../application/useCases/user/GetUser/IGetUserUseCase";
import { GetUserController } from "../../../presentation/http/controller/user/GetUserController";
import { PrismaUserRepository } from "../repositories/PrismaUserRepository";


export function GetUserComposer() {
    const repository: IUsersRepository = new PrismaUserRepository();
    const useCase: IGetUserUseCase = new GetUserCase(repository);
    const controller = new GetUserController(useCase);

    return controller
}