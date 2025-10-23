/**
 * Enumerates possible user-related error types.
 *
 * Each error type represents a specific failure that can occur
 * during user management operations such as registration,
 * authentication, or retrieval.
 *
 * @example
 * ```ts
 * if (userExists) {
 *   throw new Error(UserErrorType.UserAlreadyExists);
 * }
 * ```
 */
export enum UserErrorType {
  /**
   * Indicates that a user with the given identifier or email already exists.
   */
  UserAlreadyExists = 'User already exists!',

  /**
   * Indicates that a requested user does not exist in the system.
   */
  UserDoesNotExist = 'User does not exist!',

  /**
   * Indicates that no users were found for a given query or search criteria.
   */
  UserNotFound = 'Users not found',
}