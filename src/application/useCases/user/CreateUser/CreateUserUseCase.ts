import { ICreateUserDTO } from "../../../../domain/user/dtos/create/ICreateUserDTO";
import { UserError, UserErrorType } from "../../../../domain/user/enums/UserErrorType";
import { HttpStatusCodes } from "../../../interfaces/HttpStatusCodes";
import { IPasswordHasher } from "../../../providers/IPasswordHasher";
import { IUsersRepository } from "../../../repositories/IUsersRepository";
import { ICreateUserUseCase } from "./ICreateUserUseCase";
import { DomainError } from "../../../interfaces/IDomainError";
import { useCaseErrorHandler } from "../../../error/useCaseErrorHandler";

/**
 * Use case responsible for creating a new user.
 *
 * This class encapsulates all business logic required to create
 * a new user, including validation, duplicate checking,
 * and secure password hashing.
 *
 * @class
 */
export class CreateUserUseCase implements ICreateUserUseCase {
    /**
     * Initializes a new instance of the CreateUserUseCase class.
     *
     * @param {IUsersRepository} userRepository - The user repository for data persistence.
     * @param {IPasswordHasher} passwordHasher - The password hasher used for secure password encryption.
     */
    constructor(
        private userRepository: IUsersRepository,
        private passwordHasher: IPasswordHasher,
    ) { }

    /**
     * Executes the user creation process.
     *
     * @async
     * @param {ICreateUserDTO} data - The user data for creation (email, name, password, etc.).
     * @returns {Promise<IUseCaseResult<IUserOutputRequestDTO>>}
     * Returns an object with:
     * - `data`: The created user or an error object.
     * - `success`: Indicates whether the operation succeeded.
     *
     * @example
     * const result = await createUserUseCase.execute({
     *   email: "john.doe@example.com",
     *   first_name: "John",
     *   last_name: "Doe",
     *   password: "StrongPassword123",
     * });
     *
     * if (result.success) {
     *   console.log("User created:", result.data);
     * } else {
     *   console.error("Error:", result.error);
     * }
     */
    async execute({ email, last_name, first_name, password }: ICreateUserDTO) {
        try {
            const userAlreadyExists = await this.userRepository.findByEmail(email)

            if (userAlreadyExists) {
                throw new UserError(UserErrorType.EMAIL_ALREADY_USED)
            }

            const passwordHashed = await this.passwordHasher.hashPassword(password)
            if (!passwordHashed) {
                throw new UserError(UserErrorType.PASSWORD_HASHING_FAILED)
            }

            const user = await this.userRepository.create({
                email,
                first_name,
                last_name,
                password: passwordHashed,
            })

            return { success: true, data: user }

        } catch (err: any) {
            return useCaseErrorHandler(err);
        }
    }
}