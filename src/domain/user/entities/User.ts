// entities/User.ts

import { Email } from "../valueObjects/Email";
import { Password } from "../valueObjects/Password";
import { UserErrorType } from "../enums/UserErrorType";
import { PasswordErrorType } from "../enums/PasswordErrorType";

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
    id: string;
    uuid: string;
    firstName: string;
    lastName: string;
    email: Email;
    password: Password;
    createdAt: Date;
    updatedAt: Date;
}

/**
 * User entity representing a user in the system.
 */
export class User {
    private _id: string;
    private _uuid: string;
    private _firstName: string;
    private _lastName: string;
    private _email: Email;
    private _password: Password;
    private _createdAt: Date;
    private _updatedAt: Date;

    private constructor(props: UserProps) {
        this._id = props.id;
        this._uuid = props.uuid;
        this._firstName = props.firstName;
        this._lastName = props.lastName;
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
     * Returns the user's unique ID.
     */
    get id(): string {
        return this._id;
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
    get firstName(): string {
        return this._firstName;
    }

    /**
     * Returns the user's last name.
     */
    get lastName(): string {
        return this._lastName;
    }

    /**
     * Returns the user's full name.
     */
    get fullName(): string {
        return `${this._firstName} ${this._lastName}`;
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
    get password(): Password {
        return this._password;
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
    updatePassword(newPassword: Password): void {
        if (newPassword.value.length < 10) {
            throw new InvalidPasswordHashError();
        }
        this._password = newPassword;
        this._updatedAt = new Date();
    }

    /**
     * Updates the user's first and last name.
     * @param firstName - The new first name.
     * @param lastName - The new last name.
     */
    updateName(firstName: string, lastName: string): void {
        this._firstName = firstName;
        this._lastName = lastName;
        this._updatedAt = new Date();
    }

    /**
     * Returns a JSON representation of the user for serialization.
     * Note: password is not included in the output.
     */
    toJSON() {
        return {
            uuid: this._uuid,
            firstName: this._firstName,
            lastName: this._lastName,
            fullName: this.fullName,
            email: this._email.value,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        };
    }

    /**
     * Creates a new User instance with validation and default timestamps.
     * @param props - User properties excluding id, createdAt, and updatedAt.
     * @returns A new User instance.
     */
    static create(props: Omit<UserProps, 'id' | 'createdAt' | 'updatedAt'> & { createdAt?: Date }): User {
        const now = props.createdAt || new Date();
        return new User({
            ...props,
            id: "auto-generated-id",
            createdAt: now,
            updatedAt: now,
        });
    }
}