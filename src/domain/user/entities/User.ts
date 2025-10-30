import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { Email } from "../valueObjects/Email";
import { Password } from "../valueObjects/Password";
import { UserError, UserErrorType } from "../enums/UserErrorType";

/**
 * @file User.ts
 * @description
 * Defines the `User` aggregate root within the domain layer.
 *
 * The `User` entity encapsulates the identity and credentials
 * of a system user, enforcing all validation and domain invariants
 * related to user creation, authentication, and update lifecycle.
 *
 * Responsibilities:
 * - Represent the domain identity of a system user.
 * - Guarantee strong encapsulation of credentials (Email, Password).
 * - Enforce domain invariants (valid email, strong password, etc.).
 *
 * This class does **not** manage roles, permissions, or network membership,
 * which belong to other bounded contexts (e.g., Network).
 *
 * @example
 * ```typescript
 * const user = User.create({
 *   first_name: "Alice",
 *   last_name: "Martin",
 *   email: "alice.martin@example.com",
 *   password: "secure_password_123"
 * });
 *
 * console.log(user.fullName); // "Alice Martin"
 * ```
 */
export class User {
    /** Unique user identifier (UUID). */
    private _uuid: string;

    /** User's first name. */
    private _first_name: string;

    /** User's last name. */
    private _last_name: string;

    /** User's email as a validated value object. */
    private _email: Email;

    /** User's password as a validated value object. */
    private _password: Password;

    /** Timestamp for when the user was created. */
    private _createdAt: Date;

    /** Timestamp for when the user was last updated. */
    private _updatedAt: Date;

    /**
     * Represents the internal structure used to instantiate a {@link User}.
     * Used only within the domain, not exposed externally.
     */
    private constructor(props: UserProps) {
        this._uuid = props.uuid;
        this._first_name = props.first_name;
        this._last_name = props.last_name;
        this._email = props.email;
        this._password = props.password;
        this._createdAt = props.createdAt;
        this._updatedAt = props.updatedAt;

        this.validate();
    }

    /**
     * Validates all invariants of the {@link User} entity.
     *
     * Ensures:
     * - Password hash meets minimum strength requirements.
     * - Email value object has already validated structure.
     *
     * @private
     * @throws {UserError} If any invariant is violated.
     */
    private validate(): void {
        if (this._password.value.length < 10) {
            throw new UserError(UserErrorType.INVALID_PASSWORD_HASH);
        }
    }

    /** @returns {string} The user’s unique identifier (UUID). */
    get uuid(): string {
        return this._uuid;
    }

    /** @returns {string} The user’s first name. */
    get first_name(): string {
        return this._first_name;
    }

    /** @returns {string} The user’s last name. */
    get last_name(): string {
        return this._last_name;
    }

    /** @returns {string} The user’s full name (first + last). */
    get fullName(): string {
        return `${this._first_name} ${this._last_name}`;
    }

    /** @returns {Email} The user’s validated email value object. */
    get email(): Email {
        return this._email;
    }

    /** @returns {string} The user’s password hash (value only). */
    get password(): string {
        return this._password.value;
    }

    /** @returns {Date} The creation timestamp of the user. */
    get createdAt(): Date {
        return this._createdAt;
    }

    /** @returns {Date} The last update timestamp of the user. */
    get updatedAt(): Date {
        return this._updatedAt;
    }

    /**
     * Updates the user’s email address.
     *
     * @param {Email} newEmail - A validated {@link Email} value object.
     */
    updateEmail(newEmail: Email): void {
        this._email = newEmail;
        this._updatedAt = new Date();
    }

    /**
     * Updates the user’s password.
     *
     * @param {string} newPassword - The new password (already hashed).
     *
     * @throws {UserError} If the password does not meet domain constraints.
     */
    updatePassword(newPassword: string): void {
        if (newPassword.length < 10) {
            throw new UserError(UserErrorType.WEAK_PASSWORD);
        }
        this._password.value = newPassword;
        this._updatedAt = new Date();
    }

    /**
     * Updates the user’s name.
     *
     * @param {string} first_name - The new first name.
     * @param {string} last_name - The new last name.
     */
    updateName(first_name: string, last_name: string): void {
        this._first_name = first_name;
        this._last_name = last_name;
        this._updatedAt = new Date();
    }

    /**
     * Converts the {@link User} entity into a serializable object.
     * The password is intentionally omitted for security.
     *
     * @returns {object} A plain JavaScript object representation of the user.
     */
    toJSON(): object {
        return {
            uuid: this._uuid,
            first_name: this._first_name,
            last_name: this._last_name,
            fullName: this.fullName,
            email: this._email.value,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        };
    }

    /**
     * Factory method that creates a new {@link User} entity
     * from a validated Data Transfer Object (DTO).
     *
     * This ensures the domain remains independent from
     * infrastructure concerns (e.g., ORM, database models).
     *
     * @static
     * @param {ICreateUserDTO} data - DTO containing basic user info.
     * @returns {User} The newly created {@link User} entity.
     *
     * @example
     * ```typescript
     * const user = User.create({
     *   first_name: "John",
     *   last_name: "Doe",
     *   email: "john.doe@example.com",
     *   password: "hashed_password_here"
     * });
     * ```
     */
    static create({ first_name, last_name, email, password }: ICreateUserDTO): User {
        const newEmail = new Email({ value: email });
        const newPassword = new Password({ value: password });

        return new User({
            uuid: crypto.randomUUID?.() ?? "temp-uuid",
            first_name,
            last_name,
            password: newPassword,
            email: newEmail,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
}

/**
 * Represents the core properties required to instantiate a {@link User}.
 * Typically used internally within the domain layer.
 */
export interface UserProps {
    uuid: string;
    first_name: string;
    last_name: string;
    email: Email;
    password: Password;
    createdAt: Date;
    updatedAt: Date;
}
