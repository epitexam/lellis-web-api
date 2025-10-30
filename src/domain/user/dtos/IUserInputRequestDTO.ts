/**
 * Data Transfer Object representing basic user input data.
 *
 * This DTO is typically used when receiving or transferring
 * minimal user information within internal operations
 * (e.g. selecting a user, mapping identifiers, or partial updates).
 */
export interface IUserInputRequestDTO {
    /** The user's unique identifier (UUID). */
    uuid: string;

    /** The user's first name. */
    first_name: string;

    /** The user's last name. */
    last_name: string;
}