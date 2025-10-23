export enum PasswordErrorType {
  TooShort = 'PASSWORD_TOO_SHORT',
  TooLong = 'PASSWORD_TOO_LONG',
  MissingUppercase = 'PASSWORD_MISSING_UPPERCASE',
  MissingLowercase = 'PASSWORD_MISSING_LOWERCASE',
  MissingNumber = 'PASSWORD_MISSING_NUMBER',
  MissingSpecialChar = 'PASSWORD_MISSING_SPECIAL_CHAR',
  ContainsWhitespace = 'PASSWORD_CONTAINS_WHITESPACE',
  InvalidPasswordHash = 'Password hash must be at least 10 characters long.',
}