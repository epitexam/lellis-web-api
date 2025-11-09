import { IDomainError } from "../../application/interfaces/IDomainError";

/**
 * Type guard to check if an object is an IDomainError.
 */
export function isDomainError(obj: any): obj is IDomainError<string> {
  return obj && typeof obj.type === "string" && typeof obj.message === "string" && typeof obj.statusCode === "number";
}
