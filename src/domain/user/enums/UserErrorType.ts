import { HttpStatusCodes } from "../../../application/interfaces/HttpStatusCodes";
import { DomainError, IDomainError } from "../../../application/interfaces/IDomainError";

/**
 * User-specific error types.
 */
export enum UserErrorType {
  USER_ALREADY_EXISTS = "User already exists!",
  USER_DOES_NOT_EXIST = "User does not exist!",
  USER_NOT_FOUND = "Users not found.",
  EMAIL_ALREADY_USED = "This email is already used!",
  WEAK_PASSWORD = "The provided password is too weak.",
  INVALID_PASSWORD = "Invalid password.",
  INVALID_CREDENTIALS = "Invalid email or password.",
  PASSWORD_HASHING_FAILED = "Failed to hash password securely.",
  PASSWORD_VERIFICATION_FAILED = "Failed to verify password.",
  USER_INACTIVE = "User account is inactive.",
  EMAIL_NOT_VERIFIED = "Email address not verified.",
  INVALID_VERIFICATION_TOKEN = "Invalid or expired verification token.",
  UNEXPECTED_ERROR = "An unexpected error occurred.",
  DATABASE_ERROR = "Database error occurred.",
  EXTERNAL_SERVICE_ERROR = "External service error occurred.",
  INVALID_INPUT = "Invalid or missing input data.",
  USER_CREATION_FAILED = "Failed to create user.",
  INVALID_PASSWORD_HASH = "Invalid password hash.",
  MISSING_USER_UUID = "No user uuid was provided.",
}

/**
 * Map each UserErrorType to an HTTP status code.
 */
export const UserErrorHttpStatus: Record<UserErrorType, number> = {
  [UserErrorType.USER_ALREADY_EXISTS]: HttpStatusCodes.CONFLICT,
  [UserErrorType.USER_DOES_NOT_EXIST]: HttpStatusCodes.NOT_FOUND,
  [UserErrorType.USER_NOT_FOUND]: HttpStatusCodes.NOT_FOUND,
  [UserErrorType.EMAIL_ALREADY_USED]: HttpStatusCodes.CONFLICT,
  [UserErrorType.WEAK_PASSWORD]: HttpStatusCodes.BAD_REQUEST,
  [UserErrorType.INVALID_PASSWORD]: HttpStatusCodes.UNAUTHORIZED,
  [UserErrorType.INVALID_CREDENTIALS]: HttpStatusCodes.UNAUTHORIZED,
  [UserErrorType.PASSWORD_HASHING_FAILED]: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  [UserErrorType.PASSWORD_VERIFICATION_FAILED]: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  [UserErrorType.USER_INACTIVE]: HttpStatusCodes.FORBIDDEN,
  [UserErrorType.EMAIL_NOT_VERIFIED]: HttpStatusCodes.FORBIDDEN,
  [UserErrorType.INVALID_VERIFICATION_TOKEN]: HttpStatusCodes.BAD_REQUEST,
  [UserErrorType.UNEXPECTED_ERROR]: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  [UserErrorType.DATABASE_ERROR]: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  [UserErrorType.EXTERNAL_SERVICE_ERROR]: HttpStatusCodes.BAD_GATEWAY,
  [UserErrorType.INVALID_INPUT]: HttpStatusCodes.BAD_REQUEST,
  [UserErrorType.USER_CREATION_FAILED]: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  [UserErrorType.INVALID_PASSWORD_HASH]: HttpStatusCodes.BAD_REQUEST,
  [UserErrorType.MISSING_USER_UUID]: HttpStatusCodes.BAD_REQUEST,
};

/**
 * User-specific domain error class.
 */
export class UserError extends DomainError<UserErrorType> implements IDomainError<UserErrorType> {
  constructor(type: UserErrorType) {
    super(type, UserErrorHttpStatus);
  }
}
