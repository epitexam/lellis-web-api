/**
 * @file UserErrorType.ts
 * @description Enumerates all possible user-related error types and defines
 * a domain-specific `UserError` class for consistent error handling.
 */

/**
 * Enumerates possible user-related error types.
 *
 * Each error type represents a specific failure that can occur
 * during user management operations such as registration,
 * authentication, or profile management.
 */
export enum UserErrorType {
  // --- 🧩 ENTITY CREATION / EXISTENCE ---
  /** A user with the given email already exists in the system. */
  USER_ALREADY_EXISTS = "User already exists!",

  /** Indicates that the requested user does not exist. */
  USER_DOES_NOT_EXIST = "User does not exist!",

  /** Indicates that no users were found for a given query. */
  USER_NOT_FOUND = "Users not found.",

  /** Indicates that this email is already linked to another account. */
  EMAIL_ALREADY_USED = "This email is already used.",

  // --- 🔒 SECURITY / VALIDATION ERRORS ---
  /** Indicates that the provided password does not meet the required security policy. */
  WEAK_PASSWORD = "The provided password is too weak.",

  /** Indicates that the provided password does not match the stored hash. */
  INVALID_PASSWORD = "Invalid password.",

  /** Indicates that authentication failed due to invalid credentials. */
  INVALID_CREDENTIALS = "Invalid email or password.",

  /** Indicates that password hashing failed. */
  PASSWORD_HASHING_FAILED = "Failed to hash password securely.",

  /** Indicates that password verification failed (Argon2 comparison issue). */
  PASSWORD_VERIFICATION_FAILED = "Failed to verify password.",

  // --- 🧠 BUSINESS LOGIC / ACCOUNT STATE ---
  /** Indicates that the user account is inactive or disabled. */
  USER_INACTIVE = "User account is inactive.",

  /** Indicates that the user has not verified their email address. */
  EMAIL_NOT_VERIFIED = "Email address not verified.",

  /** Indicates that an email verification token is invalid or expired. */
  INVALID_VERIFICATION_TOKEN = "Invalid or expired verification token.",

  // --- ⚙️ TECHNICAL ERRORS ---
  /** A generic internal server error (should be logged and masked from the client). */
  UNEXPECTED_ERROR = "An unexpected error occurred.",

  /** Indicates that a database operation failed (e.g., constraint violation, connection issue). */
  DATABASE_ERROR = "Database error occurred.",

  /** Indicates that a dependency (e.g., email service, cache) failed to respond or process. */
  EXTERNAL_SERVICE_ERROR = "External service error occurred.",

  /** Indicates that a required field is missing or malformed. */
  INVALID_INPUT = "Invalid or missing input data.",

  /** Indicates that user creation failed due to a domain or repository error. */
  USER_CREATION_FAILED = "Failed to create user.",

  /** Indicates that the password hash does not meet domain rules. */
  INVALID_PASSWORD_HASH = "Invalid password hash.",
}

/**
 * Represents a domain-specific error that occurs in the user domain.
 *
 * @extends Error
 */
export class UserError extends Error {
  /** The type of user error that occurred. */
  public readonly type: UserErrorType;

  /**
   * Creates a new {@link UserError}.
   * @param {UserErrorType} type - The type of error.
   */
  constructor(type: UserErrorType) {
    super(type);
    this.name = "UserError";
    this.type = type;
    Object.setPrototypeOf(this, UserError.prototype);
  }
}
