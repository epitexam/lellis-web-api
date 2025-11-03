import { ICreateUserDTO } from "../../domain/user/dtos/ICreateUserDTO"
import { ISearchUsersInputDTO } from "../../domain/user/dtos/ISearchUsersInputDTO"
import { IUpdateUserRequestDTO } from "../../domain/user/dtos/IUpdateUserRequestDTO"
import { IUserFullDTO } from "../../domain/user/dtos/IUserFullDTO"
import { IUserOutputRequestDTO } from "../../domain/user/dtos/IUserOutputRequestDTO"
import { PaginationResponseDTO } from "../../presentation/dtos/PaginationResponseDTO"

/**
 * Defines the contract for a User Repository.
 *
 * Provides basic CRUD and pagination operations
 * for user entities.
 *
 * Any implementation (e.g., Prisma, Sequelize, InMemory)
 * must follow this interface.
 */
export interface IUsersRepository {
  /**
   * Creates a new user.
   *
   * @async
   * @param {ICreateUserDTO} data - Data required to create a new user.
   * @returns {Promise<IUserOutputRequestDTO>} The created user.
   */
  create(data: ICreateUserDTO): Promise<IUserOutputRequestDTO>

  /**
   * Finds a user by their email address.
   *
   * @async
   * @param {string} email - The user's email address.
   * @returns {Promise<IUserOutputRequestDTO | null>} The found user or `null` if not found.
   */
  findByEmail(email: string): Promise<IUserOutputRequestDTO | null>

  /**
   * Finds a user by their unique identifier.
   *
   * @async
   * @param {string} id - The user's unique ID (UUID).
   * @returns {Promise<IUserOutputRequestDTO | null>} The found user or `null` if not found.
   */
  findById(id: string): Promise<IUserOutputRequestDTO | null>

  /**
   * Retrieves a paginated list of users.
   *
   * @async
   * @param {number} pageNumber - The page number to retrieve.
   * @returns {Promise<PaginationResponseDTO<IUserOutputRequestDTO>>} The paginated user list.
   */
  findAll(pageNumber: number): Promise<PaginationResponseDTO<IUserOutputRequestDTO>>

  /**
   * Find a user, including all sensitive information.
   *
   * ⚠️ This method should be used only internally (e.g., for update operations).
   * Sensitive fields must never be returned to API consumers.
  */
  findUserWithSensitiveData(data: Partial<ICreateUserDTO>): Promise<IUserFullDTO | null>

  /**
   * Updates an existing user.
   *
   * @async
   * @param {IUserOutputRequestDTO} user - The existing user object.
   * @param {IUpdateUserRequestDTO} data - The data to update the user with.
   * @returns {Promise<IUserOutputRequestDTO>} The updated user.
   */
  update(user: Partial<IUserOutputRequestDTO>, data: Partial<IUpdateUserRequestDTO>): Promise<IUserOutputRequestDTO>


  /**
   * Searches for users based on optional filters such as first name, last name, or email.
   *
   * This method allows partial matches and should be used for listing users
   * according to search criteria. Implementations may support pagination or
   * advanced filtering if needed.
   *
   * @async
   * @param {ISearchUsersInputDTO} criteria - Optional search filters.
   * @returns {Promise<IUserOutputRequestDTO[]>} Array of users matching the criteria.
   */
  searchUsers(criteria: ISearchUsersInputDTO): Promise<IUserOutputRequestDTO[]>;

  /**
   * Deletes a user by ID.
   *
   * @async
   * @param {string} id - The user's unique ID.
   * @returns {Promise<void>} Returns nothing.
   */
  delete(id: string): Promise<void>
}
