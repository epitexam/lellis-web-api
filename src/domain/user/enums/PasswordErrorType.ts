/**
 * Enumerates the different types of password validation errors.
 *
 * Each enum value represents a user-friendly message describing
 * a specific password rule violation.
 *
 * This provides consistent, readable, and secure feedback to end users
 * during registration or password update flows.
 */
export enum PasswordErrorType {
  /**
   * The password is shorter than the minimum allowed length.
   */
  TooShort = 'Your password must be at least 8 characters long.',

  /**
   * The password exceeds the maximum allowed length.
   */
  TooLong = 'Your password is too long. Please use fewer than 64 characters.',

  /**
   * The password does not contain at least one uppercase letter (A–Z).
   */
  MissingUppercase = 'Your password must include at least one uppercase letter (A–Z).',

  /**
   * The password does not contain at least one lowercase letter (a–z).
   */
  MissingLowercase = 'Your password must include at least one lowercase letter (a–z).',

  /**
   * The password does not contain at least one numeric character (0–9).
   */
  MissingNumber = 'Your password must include at least one number (0–9).',

  /**
   * The password does not contain any special character (e.g., !@#$%^&*).
   */
  MissingSpecialChar = 'Your password must include at least one special character (e.g., !@#$%^&*).',

  /**
   * The password contains one or more whitespace characters, which are not allowed.
   */
  ContainsWhitespace = 'Your password cannot contain spaces or whitespace characters.',

  /**
   * The provided password hash is invalid or too short.
   */
  InvalidPasswordHash = 'The provided password hash is invalid or corrupted.',
}