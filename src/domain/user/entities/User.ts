import { PasswordErrorType } from "../enums/PasswordErrorType";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { Email } from "../valueObjects/Email";
import { Password } from "../valueObjects/Password";

/**
 * Custom error for user-related issues.
 */
export class UserError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserError";
    }
}

/**
 * Error thrown when password hash length is invalid.
 */
export class InvalidPasswordHashError extends UserError {
    constructor() {
        super(PasswordErrorType.InvalidPasswordHash);
    }
}

/**
 * Properties required to create a User entity.
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
 * User entity representing a user in the system.
 */
export class User {
    private _uuid: string;
    private _first_name: string;
    private _last_name: string;
    private _email: Email;
    private _password: Password;
    private _createdAt: Date;
    private _updatedAt: Date;

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
     * Validates the user properties.
     * @throws {InvalidPasswordHashError} If password hash is too short.
     */
    private validate(): void {
        if (this._password.value.length < 10) {
            throw new InvalidPasswordHashError();
        }
    }

    /**
     * Returns the user's UUID.
     */
    get uuid(): string {
        return this._uuid;
    }

    /**
     * Returns the user's first name.
     */
    get first_name(): string {
        return this._first_name;
    }

    /**
     * Returns the user's last name.
     */
    get last_name(): string {
        return this._last_name;
    }

    /**
     * Returns the user's full name.
     */
    get fullName(): string {
        return `${this._first_name} ${this._last_name}`;
    }

    /**
     * Returns the user's email value object.
     */
    get email(): Email {
        return this._email;
    }

    /**
     * Returns the user's password value object.
     */
    get password(): string {
        return this._password.value;
    }

    /**
     * Returns the user's creation date.
     */
    get createdAt(): Date {
        return this._createdAt;
    }

    /**
     * Returns the user's last update date.
     */
    get updatedAt(): Date {
        return this._updatedAt;
    }

    /**
     * Updates the user's email.
     * @param newEmail - The new email value object.
     */
    updateEmail(newEmail: Email): void {
        this._email = newEmail;
        this._updatedAt = new Date();
    }

    /**
     * Updates the user's password.
     * @param newPassword - The new password value object.
     * @throws {InvalidPasswordHashError} If the new password is too short.
     */
    updatePassword(newPassword: string): void {
        if (newPassword.length < 10) {
            throw new InvalidPasswordHashError();
        }
        this._password.value = newPassword;
        this._updatedAt = new Date();
    }

    /**
     * Updates the user's first and last name.
     * @param first_name - The new first name.
     * @param last_name - The new last name.
     */
    updateName(first_name: string, last_name: string): void {
        this._first_name = first_name;
        this._last_name = last_name;
        this._updatedAt = new Date();
    }

    /**
     * Returns a JSON representation of the user for serialization.
     * Note: password is not included in the output.
     */
    toJSON() {
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

    static create({ first_name, last_name, email, password }: ICreateUserDTO) {
        const newEmail = new Email({ value: email });
        const newPassword = new Password({ value: password })

        return new User({
            uuid: Bun.randomUUIDv7(),
            first_name,
            last_name,
            password: newPassword,
            email: newEmail,
            createdAt: new Date(),
            updatedAt: new Date(),
        })
    }
}