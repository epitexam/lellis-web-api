import { IUsersRepository } from "../../../../application/repositories/IUsersRepository";
import { ISearchUsersUseCase } from "../../../../application/useCases/user/SearchUser/ISearchUserUseCase";
import { SearchUsersUseCase } from "../../../../application/useCases/user/SearchUser/SearchUserUseCase";
import { SearchUserController } from "../../../../presentation/http/controller/user/SearchUserController";
import { PrismaUserRepository } from "../../repositories/PrismaUserRepository";

export function SearchUserComposer() {
    const repository: IUsersRepository = new PrismaUserRepository();
    const useCase: ISearchUsersUseCase = new SearchUsersUseCase(repository);
    const controller = new SearchUserController(useCase)

    return controller
}