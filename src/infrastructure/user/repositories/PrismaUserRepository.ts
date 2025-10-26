import { PaginationResponseDTO } from "../../../presentation/dtos/PaginationResponseDTO"
import { IUsersRepository } from "../../../application/repositories/IUsersRepository"
import { ICreateUserDTO } from "../../../domain/user/dtos/ICreateUserDTO"
import { IUpdateUserRequestDTO } from "../../../domain/user/dtos/IUpdateUserRequestDTO"
import { IUserOutputRequestDTO } from "../../../domain/user/dtos/IUserOutputRequestDTO"

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
    // Simulate user creation
    return {
      uuid: Bun.randomUUIDv7(),
      first_name,
      last_name,
      created_at: new Date(),
      updated_at: new Date(),
    }
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
    // Probabilité de 30% de renvoyer null
    const shouldReturnNull = Math.random() < 0.3;

    if (shouldReturnNull) {
      return null;
    }

    // Sinon, on simule un utilisateur trouvé
    return {
      uuid: Bun.randomUUIDv7(),
      first_name: "",
      last_name: "",
      created_at: new Date(),
      updated_at: new Date(),
    };
  }

  /**
   * Finds a user by unique ID.
   *
   * @async
   * @param {string} id - The user's unique ID.
   * @returns {Promise<IUserOutputRequestDTO | null>} The found user or `null`.
   */
  async findById(id: string): Promise<IUserOutputRequestDTO | null> {
    // Simulate finding a user by ID
    return null
  }

  /**
   * Retrieves a paginated list of users.
   *
   * @async
   * @param {number} pageNumber - The current page number.
   * @returns {Promise<PaginationResponseDTO<IUserOutputRequestDTO>>} The paginated user list.
   */
  async findAll(pageNumber: number): Promise<PaginationResponseDTO<IUserOutputRequestDTO>> {
    // Simulate paginated user retrieval
    return {
      data: [],
      totalItems: 0,
      totalPages: 0,
      currentPage: pageNumber,
      pageSize: 10,
    }
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
    // Simulate updating a user
    return { ...user, ...data, updated_at: new Date() }
  }

  /**
   * Deletes a user by ID.
   *
   * @async
   * @param {string} id - The user's unique ID.
   * @returns {Promise<void>} Returns nothing.
   */
  async delete(id: string): Promise<void> {
    // Simulate user deletion
    return
  }
}
