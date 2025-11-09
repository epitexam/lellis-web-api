import { IDomainError } from "./IDomainError";

/**
 * Represents the standardized result of a use case execution.
 *
 * @template T - The type of the expected data when the operation succeeds.
 * @template E - The enum type representing domain-specific errors (e.g., UserErrorType).
 */
export interface IUseCaseResult<T, E extends string = string> {
    /** Indicates whether the operation succeeded. */
    success: boolean;

    /** The resulting data when the operation is successful. */
    data?: T;

    /**
     * Contains error information if the operation failed.
     * It includes a domain-specific error type and associated HTTP status code.
     */
    error?: IDomainError<E>;
}
