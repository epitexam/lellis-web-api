import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { Email } from "../valueObjects/Email";
import { Password } from "../valueObjects/Password";
import { UserError, UserErrorType } from "../enums/UserErrorType";

/**
 * @file User.ts
 * @description Defines the User entity and its associated domain logic.
 * Includes strong validation, encapsulation, and domain-specific invariants.
 */

/**
 * Represents the required properties to instantiate a {@link User} entity.
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

/**
 * The {@link User} entity represents a system user within the domain layer.
 *
 * This class encapsulates user-related behavior, including validation logic,
 * and ensures all invariants are respected (e.g., strong password, valid email).
 */
export class User {
    private _uuid: string;
    private _first_name: string;
    private _last_name: string;
    private _email: Email;
    private _password: Password;
    private _createdAt: Date;
    private _updatedAt: Date;

    /**
     * Private constructor to enforce controlled instantiation via factory methods.
     *
     * @param {UserProps} props - The user's core properties.
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
     * Validates the integrity and invariants of the {@link User} entity.
     *
     * @private
     * @throws {UserError} If any domain constraint is violated.
     */
    private validate(): void {
        if (this._password.value.length < 10) {
            throw new UserError(UserErrorType.INVALID_PASSWORD_HASH);
        }
    }

    /** @returns {string} The user's unique identifier (UUID). */
    get uuid(): string {
        return this._uuid;
    }

    /** @returns {string} The user's first name. */
    get first_name(): string {
        return this._first_name;
    }

    /** @returns {string} The user's last name. */
    get last_name(): string {
        return this._last_name;
    }

    /** @returns {string} The user's full name (first + last). */
    get fullName(): string {
        return `${this._first_name} ${this._last_name}`;
    }

    /** @returns {Email} The user's email address (value object). */
    get email(): Email {
        return this._email;
    }

    /** @returns {string} The user's password hash (value only). */
    get password(): string {
        return this._password.value;
    }

    /** @returns {Date} The date when the user was created. */
    get createdAt(): Date {
        return this._createdAt;
    }

    /** @returns {Date} The date when the user was last updated. */
    get updatedAt(): Date {
        return this._updatedAt;
    }

    /**
     * Updates the user's email address.
     *
     * @param {Email} newEmail - The new email value object.
     */
    updateEmail(newEmail: Email): void {
        this._email = newEmail;
        this._updatedAt = new Date();
    }

    /**
     * Updates the user's password.
     *
     * @param {string} newPassword - The new password value.
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
     * Updates the user's name.
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
     * Converts the {@link User} entity into a plain JavaScript object for serialization.
     *
     * @returns {object} A JSON-safe representation of the user (password excluded).
     */
    toJSON(): object {
        return {
            uuid: this._uuid,
            first_name: this._first_name,
            last_name: this._last_name,
            fullName: this.fullName,
            email: this._email,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        };
    }

    /**
     * Factory method for creating a new {@link User} instance from a DTO.
     *
     * @static
     * @param {ICreateUserDTO} data - The user data transfer object.
     * @returns {User} A new {@link User} entity.
     *
     * @example
     * ```typescript
     * const user = User.create({
     *   email: "john.doe@example.com",
     *   first_name: "John",
     *   last_name: "Doe",
     *   password: "hashed_password_here"
     * });
     * ```
     */
    static create({ first_name, last_name, email, password }: ICreateUserDTO): User {
        const newEmail = new Email({ value: email });
        const newPassword = new Password({ value: password });

        return new User({
            uuid: crypto.randomUUID?.() ?? "temp-uuid", // safer cross-runtime UUID generation
            first_name,
            last_name,
            password: newPassword,
            email: newEmail,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }
}
