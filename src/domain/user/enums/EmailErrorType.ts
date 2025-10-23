/**
 * Enumerates the possible error types related to email validation.
 *
 * This enum provides standardized error messages and keys for 
 * consistent error handling throughout the application.
 *
 * @example
 * ```ts
 * throw new Error(EmailErrorType.InvalidEmail);
 * ```
 */
export enum EmailErrorType {
    /**
     * Indicates that the provided email address is syntactically invalid.
     *
     * Example: "invalid-email", "user@.com"
     */
    InvalidEmail = "Invalid email address!",

    /**
     * Indicates that the email value is missing or an empty string.
     *
     * Example: ""
     */
    Empty = "Email value must be a non-empty string",

    /**
     * Indicates that the email format is incorrect according to validation rules.
     *
     * This is typically thrown when the input passes the basic type check
     * but does not match the expected structure (e.g., missing '@' or domain).
     *
     * Example: "userexample.com"
     */
    Format = "Invalid email address format",
}
