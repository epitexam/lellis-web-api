import { HttpStatusCodes } from "../../../application/interfaces/HttpStatusCodes";
import { DomainError, IDomainError } from "../../../application/interfaces/IDomainError";

/**
 * Password-specific error types.
 */
export enum PasswordErrorType {
  TooShort = 'Your password must be at least 8 characters long.',
  TooLong = 'Your password is too long. Please use fewer than 64 characters.',
  MissingUppercase = 'Your password must include at least one uppercase letter (A–Z).',
  MissingLowercase = 'Your password must include at least one lowercase letter (a–z).',
  MissingNumber = 'Your password must include at least one number (0–9).',
  MissingSpecialChar = 'Your password must include at least one special character (e.g., !@#$%^&*).',
  ContainsWhitespace = 'Your password cannot contain spaces or whitespace characters.',
  InvalidPasswordHash = 'The provided password hash is invalid or corrupted.',
}

/**
 * Map each PasswordErrorType to an HTTP status code.
 */
export const PasswordErrorHttpStatus: Record<PasswordErrorType, number> = {
  [PasswordErrorType.TooShort]: HttpStatusCodes.BAD_REQUEST,
  [PasswordErrorType.TooLong]: HttpStatusCodes.BAD_REQUEST,
  [PasswordErrorType.MissingUppercase]: HttpStatusCodes.BAD_REQUEST,
  [PasswordErrorType.MissingLowercase]: HttpStatusCodes.BAD_REQUEST,
  [PasswordErrorType.MissingNumber]: HttpStatusCodes.BAD_REQUEST,
  [PasswordErrorType.MissingSpecialChar]: HttpStatusCodes.BAD_REQUEST,
  [PasswordErrorType.ContainsWhitespace]: HttpStatusCodes.BAD_REQUEST,
  [PasswordErrorType.InvalidPasswordHash]: HttpStatusCodes.BAD_REQUEST,
};

/**
 * Password-specific domain error class.
 */
export class PasswordError extends DomainError<PasswordErrorType> implements IDomainError<PasswordErrorType> {
  constructor(type: PasswordErrorType) {
    super(type, PasswordErrorHttpStatus);
  }
}
