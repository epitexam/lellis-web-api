
/**
 * DTO representing the optional input filters for searching users.
 */
export interface ISearchUsersInputDTO {
    /** Filter by first name (optional, partial match allowed). */
    first_name?: string;

    /** Filter by last name (optional, partial match allowed). */
    last_name?: string;

    /** Filter by email (optional, partial match allowed). */
    email?: string;
}