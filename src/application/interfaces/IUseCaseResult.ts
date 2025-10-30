/**
 * Represents the generic structure of a use case result.
 * 
 * @template T - The type of the expected data when the operation succeeds.
 */
export interface IUseCaseResult<T> {
    /**
     * Indicates whether the operation succeeded.
     */
    success: boolean;

    /**
     * The resulting data when the operation is successful.
     */
    data?: T;

    /**
     * An error message, present only when the operation fails.
     */
    error?: string;
}
