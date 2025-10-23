/**
 * Data Transfer Object for updating an existing user’s information.
 *
 * Contains user fields that can be updated.
 */
export interface IUpdateUserRequestDTO {
    /** The user's new first name. */
    first_name: string;

    /** The user's new last name. */
    last_name: string;

    /** The user's new email address. */
    email: string;

    /** The user's new raw password (to be hashed before storing). */
    password: string;
}