export interface EmailProps {
    address: string;
}

export class Email {
    private readonly _value: string;

    private constructor(props: EmailProps) {
        this._value = props.address.toLowerCase();
        this.validate();
    }

    /**
     * Validates the email format.
     * @throws {Error} If the email format is invalid.
     */
    private validate(): void {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this._value)) {
            throw new Error("Invalid email format");
        }
    }

    /**
     * Returns the email address value.
     */
    get value(): string {
        return this._value;
    }

    /**
     * Creates a new Email instance after validation.
     * @param props - Email properties.
     * @returns A new Email instance.
     */
    static create(props: EmailProps): Email {
        return new Email(props);
    }
}