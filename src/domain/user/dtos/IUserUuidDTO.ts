/**
 * @file IUserUuidDTO.ts
 * @description
 * Data Transfer Object (DTO) representing a user's unique identifier.
 *
 * This DTO is typically used to identify a specific user in the system
 * for operations such as fetching, updating, or deleting a user.
 *
 * It ensures type safety when passing user identifiers between
 * the application layer and the domain or infrastructure layers.
 *
 * @example
 * ```ts
 * const userIdentifier: IUserUuidDTO = {
 *   uuid: "b8a6e550-7b4e-4e8b-9d8b-3bdfb9d6a31f"
 * };
 *
 * // Using it to update a user
 * const result = await updateUserUseCase.execute(userIdentifier, { first_name: "Alice" });
 * ```
 */
export interface IUserUuidDTO {
  /**
   * The unique identifier (UUID) of the user.
   *
   * This value is immutable and uniquely identifies a user in the system.
   *
   * @example "b8a6e550-7b4e-4e8b-9d8b-3bdfb9d6a31f"
   */
  uuid: string;
}
