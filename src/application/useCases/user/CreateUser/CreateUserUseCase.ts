import { ICreateUserDTO } from "../../../../domain/user/dtos/ICreateUserDTO"
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO"
import { User } from "../../../../domain/user/entities/User"
import { UserErrorType } from "../../../../domain/user/enums/UserErrorType"
import { IPasswordHasher } from "../../../providers/IPasswordHasher"
import { IUsersRepository } from "../../../repositories/IUsersRepository"
import { ICreateUserUseCase, IUseCaseResult } from "./ICreateUserUseCase"

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
     * @returns {Promise<{ data: any; success: boolean }>} 
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
     *   console.error("Error:", result.data.error);
     * }²
     */
    async execute({ email, last_name, first_name, password }: ICreateUserDTO) {
        try {
            const userAlreadyExists = await this.userRepository.findByEmail(email)
            if (userAlreadyExists) {
                return { success: false, error: UserErrorType.EmailAlreadyUsed }
            }

            const passwordHashed = await this.passwordHasher.hashPassword(password)
            if (!passwordHashed) {
                return { success: false, error: UserErrorType.PasswordHashingFailed }
            }

            const user = await this.userRepository.create({
                email,
                first_name,
                last_name,
                password: passwordHashed,
            })

            return { success: true, data: user }

        } catch (err: any) {

            if (
                // Prisma unique constraint
                err.code === 'P2002' ||
                // PostgreSQL
                err.code === '23505' ||
                // MySQL
                err.code?.includes('ER_DUP_ENTRY') ||
                // SQLite
                err.code?.includes('SQLITE_CONSTRAINT')
            ) {
                return { success: false, error: UserErrorType.DatabaseError }
            }


            return { success: false, error: UserErrorType.UnexpectedError }
        }

    }
}
