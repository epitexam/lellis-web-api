
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { ISearchUsersUseCase } from "./ISearchUserUseCase";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { useCaseErrorHandler } from "../../../error/useCaseErrorHandler";
import { ISearchUsersInputDTO } from "../../../../domain/user/dtos/search/ISearchUsersInputDTO";

/**
 * @class SearchUsersUseCase
 * @description
 * Implementation of the search users use case.
 * Queries the user repository using optional criteria such as first name, last name, or email.
 */
export class SearchUsersUseCase implements ISearchUsersUseCase {
    constructor(private userRepository: IUsersRepository) { }

    async execute(criteria: Partial<ISearchUsersInputDTO>): Promise<IUseCaseResult<IUserOutputRequestDTO[]>> {
        try {
            const users = await this.userRepository.searchUsers(criteria);

            return {
                success: true,
                data: users
            };

        } catch (err: any) {
            return useCaseErrorHandler(err);
        }
    }
}
