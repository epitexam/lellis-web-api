/**
 * Enumerates the different types of password validation errors.
 *
 * Each enum value represents a specific rule violation that may occur
 * during password creation or validation.
 *
 * This allows consistent and descriptive error handling across
 * authentication, registration, and password update flows.
 *
 * @example
 * ```ts
 * if (password.length < 8) {
 *   throw new Error(PasswordErrorType.TooShort);
 * }
 * ```
 */
export enum PasswordErrorType {
  /**
   * The password is shorter than the minimum allowed length.
   */
  TooShort = 'PASSWORD_TOO_SHORT',

  /**
   * The password exceeds the maximum allowed length.
   */
  TooLong = 'PASSWORD_TOO_LONG',

  /**
   * The password does not contain at least one uppercase letter (A–Z).
   */
  MissingUppercase = 'PASSWORD_MISSING_UPPERCASE',

  /**
   * The password does not contain at least one lowercase letter (a–z).
   */
  MissingLowercase = 'PASSWORD_MISSING_LOWERCASE',

  /**
   * The password does not contain at least one numeric character (0–9).
   */
  MissingNumber = 'PASSWORD_MISSING_NUMBER',

  /**
   * The password does not contain any special character (e.g., !@#$%^&*).
   */
  MissingSpecialChar = 'PASSWORD_MISSING_SPECIAL_CHAR',

  /**
   * The password contains one or more whitespace characters, which are not allowed.
   */
  ContainsWhitespace = 'PASSWORD_CONTAINS_WHITESPACE',

  /**
   * The provided password hash is invalid or too short.
   *
   * Typically indicates a malformed or corrupted hash string.
   */
  InvalidPasswordHash = 'Password hash must be at least 10 characters long.',
}