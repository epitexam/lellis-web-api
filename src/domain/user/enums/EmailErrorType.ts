import { HttpStatusCodes } from "../../../application/interfaces/HttpStatusCodes";
import { DomainError, IDomainError } from "../../../application/interfaces/IDomainError";

/**
 * Email-specific error types.
 */
export enum EmailErrorType {
  InvalidEmail = "Invalid email address!",
  Empty = "Email value must be a non-empty string",
  Format = "Invalid email address format",
}

/**
 * Map each EmailErrorType to an HTTP status code.
 */
export const EmailErrorHttpStatus: Record<EmailErrorType, number> = {
  [EmailErrorType.InvalidEmail]: HttpStatusCodes.BAD_REQUEST,
  [EmailErrorType.Empty]: HttpStatusCodes.BAD_REQUEST,
  [EmailErrorType.Format]: HttpStatusCodes.BAD_REQUEST,
};

/**
 * Email-specific domain error class.
 */
export class EmailError extends DomainError<EmailErrorType> implements IDomainError<EmailErrorType> {
  constructor(type: EmailErrorType) {
    super(type, EmailErrorHttpStatus);
  }
}
