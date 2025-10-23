import { EmailErrorType } from "../enums/EmailErrorType";

/**
 * Represents the properties required to create an {@link Email} instance.
 */
export interface EmailProps {
    /**
     * The email address as a string.
     */
    value: string;
}

/**
 * Represents a validated and immutable email value object.
 *
 * This class ensures that only properly formatted and normalized
 * email addresses can be instantiated. The value is stored in
 * lowercase form to ensure consistency during comparison.
 *
 * @example
 * ```ts
 * const email = new Email({ value: "User@Example.com" });
 * console.log(email.value); // "user@example.com"
 * ```
 */
export class Email {
    /**
     * The validated, normalized, and immutable email address.
     */
    private readonly _value: string;

    /**
     * Gets the normalized email address.
     */
    get value(): string {
        return this._value;
    }

    /**
     * Creates a new {@link Email} instance after validating and normalizing the input.
     *
     * @param props - An object containing the email address string.
     * @throws {TypeError} If `props` or `props.value` is not a string.
     * @throws {Error} If the email format is invalid.
     *
     * @example
     * ```ts
     * const validEmail = new Email({ value: "test@example.com" });
     * 
     * // Throws an error:
     * const invalidEmail = new Email({ value: "invalid-email" });
     * ```
     */
    constructor(props: EmailProps) {
        if (!props || typeof props.value !== "string") {
            throw new TypeError(EmailErrorType.Empty);
        }

        const trimmed = props.value.trim().toLowerCase();

        // Simple and safe regex that covers most valid emails without risking ReDoS
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmed)) {
            throw new Error(`${EmailErrorType.Format} "${props.value}"`);
        }

        this._value = trimmed;
        Object.freeze(this); // Enforces immutability at runtime
    }

    /**
     * Compares this email with another for equality.
     *
     * @param other - Another {@link Email} instance.
     * @returns `true` if both represent the same email address, `false` otherwise.
     */
    equals(other: Email): boolean {
        return other instanceof Email && this._value === other.value;
    }

    /**
     * Returns the string representation of the email.
     */
    toString(): string {
        return this._value;
    }
}
