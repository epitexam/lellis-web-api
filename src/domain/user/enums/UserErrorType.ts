/**
 * Enumerates possible user-related error types.
 *
 * Each error type represents a specific failure that can occur
 * during user management operations such as registration,
 * authentication, or profile management.
 */
export enum UserErrorType {
  /**
   * A user with the given email already exists in the system.
   */
  UserAlreadyExists = 'User already exists!',

  /**
   * Indicates that the requested user does not exist.
   */
  UserDoesNotExist = 'User does not exist!',

  /**
   * Indicates that no users were found for a given query.
   */
  UserNotFound = 'Users not found.',

  /**
   * Indicates that this email is already linked to another account.
   */
  EmailAlreadyUsed = 'This email is already used.',

  // --- 🔒 SECURITY / VALIDATION ERRORS ---
  /**
   * Indicates that the provided password does not meet the required security policy.
   */
  WeakPassword = 'The provided password is too weak.',

  /**
   * Indicates that the provided password does not match the stored hash.
   */
  InvalidPassword = 'Invalid password.',

  /**
   * Indicates that authentication failed due to invalid credentials.
   */
  InvalidCredentials = 'Invalid email or password.',

  /**
   * Indicates that password hashing failed.
   */
  PasswordHashingFailed = 'Failed to hash password securely.',

  /**
   * Indicates that password verification failed (Argon2 comparison issue).
   */
  PasswordVerificationFailed = 'Failed to verify password.',

  // --- 🧠 BUSINESS LOGIC / ACCOUNT STATE ---
  /**
   * Indicates that the user account is inactive or disabled.
   */
  UserInactive = 'User account is inactive.',

  /**
   * Indicates that the user has not verified their email address.
   */
  EmailNotVerified = 'Email address not verified.',

  /**
   * Indicates that an email verification token is invalid or expired.
   */
  InvalidVerificationToken = 'Invalid or expired verification token.',

  // --- ⚙️ TECHNICAL ERRORS ---
  /**
   * A generic internal server error (should be logged and masked from the client).
   */
  UnexpectedError = 'An unexpected error occurred.',

  /**
   * Indicates that a database operation failed (e.g., constraint violation, connection issue).
   */
  DatabaseError = 'Database error occurred.',

  /**
   * Indicates that a dependency (e.g., email service, cache) failed to respond or process.
   */
  ExternalServiceError = 'External service error occurred.',

  /**
   * Indicates that a required field is missing or malformed.
   */
  InvalidInput = 'Invalid or missing input data.',

  /**
   * Indicates that user creation failed due to a domain or repository error.
   */
  UserCreationFailed = 'Failed to create user.',
}