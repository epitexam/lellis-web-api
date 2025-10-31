import { IUpdateUserRequestDTO } from "../../../../domain/user/dtos/IUpdateUserRequestDTO"
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO"
import { UserErrorType } from "../../../../domain/user/enums/UserErrorType"
import { IUseCaseResult } from "../../../interfaces/IUseCaseResult"
import { IPasswordHasher } from "../../../providers/IPasswordHasher"
import { IUsersRepository } from "../../../repositories/IUsersRepository"

/**
 * Use case responsible for updating an existing user.
 *
 * This class orchestrates the process of:
 *  - Retrieving the existing user (including sensitive fields),
 *  - Hashing a new password if provided,
 *  - Applying updates to the user,
 *  - Returning a clean and safe output DTO.
 *
 * Sensitive data (like password hashes) are never exposed
 * outside the application layer.
 */
export class UpdateUserUseCase {
    constructor(
        private readonly userRepository: IUsersRepository,
        private readonly passwordHasher: IPasswordHasher
    ) { }

    /**
     * Executes the user update operation.
     *
     * @param userEmail - The email of the user to update.
     * @param data - The partial data to update the user with.
     * @returns {Promise<IUseCaseResult<IUserOutputRequestDTO>>}
     *          A standardized result object containing the updated user
     *          or an error code.
     */
    async execute(userEmail: string, data: Partial<IUpdateUserRequestDTO>): Promise<IUseCaseResult<IUserOutputRequestDTO>> {
        try {
            const existingUser = await this.userRepository.findUserWithSensitiveData({ email: userEmail })
            if (!existingUser) {
                return { success: false, error: UserErrorType.USER_NOT_FOUND }
            }

            const updateData: Partial<IUpdateUserRequestDTO> = { ...data }

            if (data.password) {
                updateData.password = await this.passwordHasher.hashPassword(data.password)
            }

            const updatedUser = await this.userRepository.update(existingUser, updateData)

            return { success: true, data: updatedUser }
        } catch (err: any) {
            if (
                err.code === "P2002" ||
                err.code === "23505" ||
                err.code?.includes("ER_DUP_ENTRY") ||
                err.code?.includes("SQLITE_CONSTRAINT")
            ) {
                return { success: false, error: UserErrorType.EMAIL_ALREADY_USED }
            }

            return { success: false, error: UserErrorType.UNEXPECTED_ERROR }
        }
    }
}
