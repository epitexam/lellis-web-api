import { ISearchUsersUseCase } from "../../../../application/useCases/user/SearchUser/ISearchUserUseCase";
import { ISearchUsersInputDTO } from "../../../../domain/user/dtos/search/ISearchUsersInputDTO";
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { IController } from "../../interface/IController";

export class SearchUserController implements IController<ISearchUsersInputDTO, IUserOutputRequestDTO[]> {
    constructor(private readonly searchUserUseCase: ISearchUsersUseCase) { }

    async handle(request: ISearchUsersInputDTO): Promise<IUserOutputRequestDTO[]> {
        const result = await this.searchUserUseCase.execute(request)

        if (!result.success || !result.data) {
            throw result.error;
        }
        
        return result.data
    }
}