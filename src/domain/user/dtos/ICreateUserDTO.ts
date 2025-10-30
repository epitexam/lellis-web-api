/**
 * Data Transfer Object for creating a new user.
 *
 * This DTO contains the necessary information required
 * to register or create a user in the system.
 */
export interface ICreateUserDTO {
    /** The user's first name. */
    first_name: string;

    /** The user's last name. */
    last_name: string;

    /** The user's email address. */
    email: string;

    /** The user's raw password (to be hashed before storing). */
    password: string;
}
