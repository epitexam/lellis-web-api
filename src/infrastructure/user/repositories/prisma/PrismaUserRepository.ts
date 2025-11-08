import { PaginationResponseDTO } from "../../../../presentation/dtos/PaginationResponseDTO"
import { IUsersRepository } from "../../../../application/repositories/IUsersRepository"
import { ICreateUserDTO } from "../../../../domain/user/dtos/ICreateUserDTO"
import { IUpdateUserRequestDTO } from "../../../../domain/user/dtos/IUpdateUserRequestDTO"
import { IUserOutputRequestDTO } from "../../../../domain/user/dtos/IUserOutputRequestDTO"
import { IUserFullDTO } from "../../../../domain/user/dtos/IUserFullDTO"
import { ISearchUsersInputDTO } from "../../../../domain/user/dtos/ISearchUsersInputDTO"

/**
 * Prisma-based implementation of the {@link IUsersRepository}.
 * 
 * This class provides mocked methods to simulate interaction
 * with a real Prisma ORM data source.
 *
 * @class
 * @implements {IUsersRepository}
 */
export class PrismaUserRepository implements IUsersRepository {

  /**
   * Creates a new user in the database.
   *
   * @async
   * @param {ICreateUserDTO} data - The user data for creation.
   * @returns {Promise<IUserOutputRequestDTO>} The created user.
   */
  async create({ email, last_name, first_name, password }: ICreateUserDTO): Promise<IUserOutputRequestDTO> {
    throw new Error("Method not implemented yet")
  }

  /**
   * Finds a user by email address.
   *
   * @async
   * @param {string} email - The user's email address.
   * @returns {Promise<IUserOutputRequestDTO | null>} The found user or `null`.
   */
  // async findByEmail(email: string): Promise<IUserOutputRequestDTO | null> {
  //   // Simulate finding a user by email
  //   return {
  //     uuid: Bun.randomUUIDv7(),
  //     first_name: "",
  //     last_name: "",
  //     created_at: new Date(),
  //     updated_at: new Date(),
  //   }
  // }

  async findByEmail(email: string): Promise<IUserOutputRequestDTO | null> {
    throw new Error("Method not implemented yet")
  }

  /**
   * Finds a user by unique ID.
   *
   * @async
   * @param {string} id - The user's unique ID.
   * @returns {Promise<IUserOutputRequestDTO | null>} The found user or `null`.
   */
  async findById(id: string): Promise<IUserOutputRequestDTO | null> {
    throw new Error("Method not implemented yet")
  }

  /**
   * Retrieves a paginated list of users.
   *
   * @async
   * @param {number} pageNumber - The current page number.
   * @returns {Promise<PaginationResponseDTO<IUserOutputRequestDTO>>} The paginated user list.
   */
  async findAll(pageNumber: number): Promise<PaginationResponseDTO<IUserOutputRequestDTO>> {
    throw new Error("Method not implemented yet")
  }

  /**
   * Updates an existing user.
   *
   * @async
   * @param {IUserOutputRequestDTO} user - The existing user to update.
   * @param {IUpdateUserRequestDTO} data - The new user data.
   * @returns {Promise<IUserOutputRequestDTO>} The updated user.
   */
  async update(user: IUserOutputRequestDTO, data: IUpdateUserRequestDTO): Promise<IUserOutputRequestDTO> {
    throw new Error("Method not implemented yet")
  }

  async searchUsers(criteria: ISearchUsersInputDTO): Promise<IUserOutputRequestDTO[]> {
    throw new Error("Method not umplemented.")
  }

  /**
   * Missing documentation
   *
   */
  async findUserWithSensitiveData(userId: string): Promise<IUserFullDTO | null> {
    throw new Error("Method not implemented yet")
  }

  /**
   * Deletes a user by ID.
   *
   * @async
   * @param {string} id - The user's unique ID.
   * @returns {Promise<void>} Returns nothing.
   */
  async delete(id: string): Promise<void> {
    throw new Error("Method not implemented yet")
  }
}
