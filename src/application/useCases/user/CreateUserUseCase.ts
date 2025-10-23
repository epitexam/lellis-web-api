import { ICreateUserDTO } from "../../../domain/user/dtos/ICreateUserDTO"
import { User } from "../../../domain/user/entities/User"
import { UserErrorType } from "../../../domain/user/enums/UserErrorType"
import { IPasswordHasher } from "../../providers/IPasswordHasher"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { ICreateUserUseCase } from "./ICreateUserUseCase"

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
     * }
     */
    async execute({ email, last_name, first_name, password }: ICreateUserDTO) {
        try {
            // Create a new user domain entity
            const userEntity = User.create({
                email,
                last_name,
                first_name,
                password,
            })

            // Check if a user with the same email already exists
            const userAlreadyExists = await this.userRepository.findByEmail(
                userEntity.email.value
            )

            if (userAlreadyExists) {
                return {
                    data: { error: UserErrorType.UserAlreadyExists },
                    success: false,
                }
            }

            // Hash the password securely before saving
            const passwordHashed = await this.passwordHasher.hashPassword(password)

            // Persist the new user
            const user = await this.userRepository.create({
                email: userEntity.email.value,
                first_name: userEntity.first_name,
                last_name: userEntity.last_name,
                password: passwordHashed,
            })

            // Return the created user
            return { data: user, success: true }
        } catch (error: any) {
            // Catch and return unexpected errors
            return { data: { error: error.message }, success: false }
        }
    }
}
