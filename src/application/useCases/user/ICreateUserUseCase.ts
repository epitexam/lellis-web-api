import { ICreateUserDTO } from "../../../domain/user/dtos/ICreateUserDTO";

/**
 * Interface for the CreateUserUseCase.
 * 
 * Defines the contract for a use case responsible for creating a new user.
 * Any implementation of this interface must provide the execute method.
 */
export interface ICreateUserUseCase {
    /**
     * Executes the user creation process.
     * 
     * @param data - The user data required for creation (email, first_name, last_name, password).
     * @returns A promise resolving to an object containing:
     *  - `data`: The created user object or an error object.
     *  - `success`: A boolean indicating if the operation was successful.
     */
    execute(data: ICreateUserDTO): Promise<{ data: any; success: boolean }>;
}
