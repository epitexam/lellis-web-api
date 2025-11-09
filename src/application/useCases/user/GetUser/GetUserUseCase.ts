import { IUserInputRequestDTO } from "../../../../domain/user/dtos/IUserInputRequestDTO";
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { IGetUserUseCase } from "./IGetUserUseCase";
import { UserError, UserErrorType } from "../../../../domain/user/enums/UserErrorType";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { HttpStatusCodes } from "../../../interfaces/HttpStatusCodes";
import { useCaseErrorHandler } from "../../../error/useCaseErrorHandler";

/**
 * @class GetUserCase
 * @implements {IGetUserUseCase}
 * @description
 * Use case responsible for fetching a user by UUID.
 * Returns safe, non-sensitive user data via {@link IUserOutputRequestDTO}.
 */
export class GetUserCase implements IGetUserUseCase {

    constructor(private userRepository: IUsersRepository) { }

    /**
     * Executes the get user operation.
     *
     * @param {Partial<IUserInputRequestDTO>} data - Input DTO containing the UUID of the user.
     * @returns {Promise<IUseCaseResult<IUserOutputRequestDTO>>} Result object with user data or error.
     */
    async execute(data: Partial<IUserInputRequestDTO>): Promise<IUseCaseResult<IUserOutputRequestDTO>> {
        try {
            if (!data.uuid) {
                throw new UserError(UserErrorType.MISSING_USER_UUID)
            }

            const user = await this.userRepository.findById(data.uuid);

            if (!user) {
                throw new UserError(UserErrorType.USER_NOT_FOUND)
            }

            const output: IUserOutputRequestDTO = {
                uuid: user.uuid,
                first_name: user.first_name,
                last_name: user.last_name,
                created_at: user.created_at,
                updated_at: user.updated_at
            };

            return {
                success: true,
                data: output
            };

        } catch (err) {
            return useCaseErrorHandler(err);
        }
    }
}
