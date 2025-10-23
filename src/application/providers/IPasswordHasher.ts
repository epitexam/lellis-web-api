/**
 * Defines the contract for password hashing utilities.
 *
 * Implementations of this interface (e.g., using bcrypt, Argon2, etc.)
 * should provide secure methods to hash and compare passwords.
 */
export interface IPasswordHasher {
    /**
     * Generates a secure hash from a plain text password.
     *
     * @async
     * @param {string} password - The plain text password to hash.
     * @returns {Promise<string>} The securely hashed password.
     */
    hashPassword(password: string): Promise<string>;

    /**
     * Compares a plain text password with a hashed password to verify a match.
     *
     * @async
     * @param {string} password - The plain text password to verify.
     * @param {string} hashedPassword - The previously hashed password.
     * @returns {Promise<boolean>} `true` if the passwords match, otherwise `false`.
     */
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}