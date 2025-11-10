import { IUpdateUserInputDTO } from "../../../../domain/user/dtos/update/IUpdateUserInputDTO";
import { IUpdateUserOutputDTO } from "../../../../domain/user/dtos/update/IUpdateUserOutputDTO";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { IPasswordHasher } from "../../../providers/IPasswordHasher";
import { IUpdateUserUseCase } from "./IUpdateUserUseCase";
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult";
import { UserError, UserErrorType } from "../../../../domain/user/enums/UserErrorType";
import { useCaseErrorHandler } from "../../../error/useCaseErrorHandler";

/**
 * @file UpdateUserUseCase.ts
 * @description
 * Implements the use case responsible for updating an existing {@link User} entity.
 *
 * This class orchestrates the process of:
 * - Retrieving the existing user (including sensitive fields),
 * - Hashing a new password if provided,
 * - Applying updates to the user,
 * - Returning only the user's UUID in the response.
 *
 * Sensitive data (like password hashes) are never exposed outside the application layer.
 */
export class UpdateUserUseCase implements IUpdateUserUseCase {
    constructor(
        private readonly userRepository: IUsersRepository,
        private readonly passwordHasher: IPasswordHasher
    ) { }

    /**
     * Executes the user update operation.
     *
     * @param {IUpdateUserInputDTO} data - The fields to update.
     *
     * @returns {Promise<IUseCaseResult<IUpdateUserOutputDTO>>}
     * Returns a structured result containing either:
     * - `data`: the updated user's UUID
     * - `error`: a domain error in case of failure
     */
    async execute(data: IUpdateUserInputDTO): Promise<IUseCaseResult<IUpdateUserOutputDTO>> {
        try {
            const existingUser = await this.userRepository.findUserWithSensitiveData(data.user_id);

            if (!existingUser) {
                throw new UserError(UserErrorType.USER_NOT_FOUND);
            }

            const updatedData = { ...data };

            if (data.password) {
                const hashedPassword = await this.passwordHasher.hashPassword(data.password);
                if (!hashedPassword) {
                    throw new UserError(UserErrorType.PASSWORD_HASHING_FAILED);
                }
                updatedData.password = hashedPassword;
            }

            await this.userRepository.update(updatedData);

            return {
                success: true,
                data: { user_id: data.user_id }
            };
        } catch (err: any) {
            return useCaseErrorHandler(err);
        }
    }
}
