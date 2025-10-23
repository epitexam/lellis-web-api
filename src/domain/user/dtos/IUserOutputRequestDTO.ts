/**
 * Represents the user data returned to the client or external layers.
 *
 * This DTO (Data Transfer Object) is used to expose safe,
 * non-sensitive user information, typically after database operations
 * or as part of API responses.
 */
export interface IUserOutputRequestDTO {
  /** The user's unique identifier (UUID). */
  uuid: string;

  /** The user's first name. */
  first_name: string;

  /** The user's last name. */
  last_name: string;

  /** The date when the user was created. */
  created_at: Date;

  /** The date when the user was last updated. */
  updated_at: Date;
}
