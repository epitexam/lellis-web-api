/**
 * Generic interface representing a domain-specific error.
 *
 * @template T - Enum type representing specific error codes/messages.
 */
export interface IDomainError<T extends string> {
  /** Human-readable error message. */
  message: string;

  /** The specific type of error (from an enum). */
  type: T;

  /** Corresponding HTTP status code to use in API responses. */
  statusCode: number;
}

/**
 * Generic domain error class implementing IDomainError.
 *
 * @template T - Enum type representing specific error codes/messages.
 */
export class DomainError<T extends string> extends Error implements IDomainError<T> {
  public readonly type: T;
  public readonly statusCode: number;

  /**
   * Creates a new domain error.
   *
   * @param type - The type of the error (from enum).
   * @param mapTypeToStatus - A map from error type to HTTP status code.
   */
  constructor(type: T, mapTypeToStatus: Record<T, number>) {
    super(type);
    this.name = "DomainError";
    this.type = type;
    this.statusCode = mapTypeToStatus[type];
    Object.setPrototypeOf(this, DomainError.prototype);
  }
}