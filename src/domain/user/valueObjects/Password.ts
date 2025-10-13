import { PasswordErrorType } from "../enums/PasswordErrorType";

export class Password {
  private readonly _value: string;

  private constructor(value: string) {
    this._value = value;
    this.validate();
  }

  /**
   * Validates the password value.
   * @throws {Error} If the password is invalid.
   */
  private validate(): void {
    if (this._value.length < 10) {
      throw new Error(PasswordErrorType.InvalidPasswordHash);
    }
  }

  /**
   * Returns the password value.
   */
  get value(): string {
    return this._value;
  }

  /**
   * Creates a new Password instance after validation.
   * @param password - The raw password string.
   * @returns A new Password instance.
   */
  static create(password: string): Password {
    return new Password(password);
  }
}