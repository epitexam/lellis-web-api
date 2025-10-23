import { PasswordErrorType } from "../enums/PasswordErrorType"

/**
 * Interface defining the props required to create a Password instance.
 */
export interface PasswordProps {
  value: string
}

/**
 * Represents a validated Password value object.
 * Performs strict validation upon instantiation.
 */
export class Password {
  private _value: string

  /**
   * Gets the raw password value.
   * Note: Consider hashing before exposing in real applications.
   */
  get value(): string {
    return this._value
  }

  set value(newValue: string) {
    const errors = Password.validate(newValue)
    if (errors.length > 0) {
      throw new Error(errors[0]) // You can choose to aggregate instead
    }
    this._value = newValue
  }

  /**
   * Creates a new Password instance.
   * Throws an error if the password is invalid.
   * 
   * @param props - Password props object
   * @throws {Error} - with the first encountered PasswordErrorType
   */
  constructor(props: PasswordProps) {
    const errors = Password.validate(props.value)

    if (errors.length > 0) {
      throw new Error(errors[0]) // You can choose to aggregate instead
    }

    this._value = props.value
  }

  /**
   * Validates the password value against security rules.
   * Returns a list of all validation error types.
   *
   * @param password - The password string to validate
   * @returns PasswordErrorType[] - list of validation failures (empty if valid)
   */
  static validate(password: string): PasswordErrorType[] {
    const errors: PasswordErrorType[] = []

    const MIN_LENGTH = 8
    const MAX_LENGTH = 128

    const REGEX = {
      uppercase: /[A-Z]/,
      lowercase: /[a-z]/,
      number: /[0-9]/,
      specialChar: /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/~`]/,
      whitespace: /\s/
    }

    if (password.length < MIN_LENGTH) {
      errors.push(PasswordErrorType.TooShort)
    }

    if (password.length > MAX_LENGTH) {
      errors.push(PasswordErrorType.TooLong)
    }

    if (!REGEX.uppercase.test(password)) {
      errors.push(PasswordErrorType.MissingUppercase)
    }

    if (!REGEX.lowercase.test(password)) {
      errors.push(PasswordErrorType.MissingLowercase)
    }

    if (!REGEX.number.test(password)) {
      errors.push(PasswordErrorType.MissingNumber)
    }

    if (!REGEX.specialChar.test(password)) {
      errors.push(PasswordErrorType.MissingSpecialChar)
    }

    if (REGEX.whitespace.test(password)) {
      errors.push(PasswordErrorType.ContainsWhitespace)
    }

    return errors
  }
}
