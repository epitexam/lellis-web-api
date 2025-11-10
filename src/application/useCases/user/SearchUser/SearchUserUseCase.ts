
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { UserErrorType } from "../../../../domain/user/enums/UserErrorType";
import { ISearchUsersUseCase } from "./ISearchUserUseCase";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { ISearchUsersInputDTO } from "../../../../domain/user/dtos/search/ISearchUsersInputDTO";
import { HttpStatusCodes } from "../../../interfaces/HttpStatusCodes";
import { useCaseErrorHandler } from "../../../error/useCaseErrorHandler";

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
                data: users.map(user => ({
                    uuid: user.uuid,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }))
            };
        } catch (err: any) {
            return useCaseErrorHandler(err);
        }
    }
}
