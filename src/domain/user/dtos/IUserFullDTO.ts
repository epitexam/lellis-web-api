import { Email } from "../valueObjects/Email"
import { Password } from "../valueObjects/Password"

/**
 * Data Transfer Object (DTO) representing the complete internal state of a User entity.
 *
 * This DTO is designed for **internal application use only**.
 * It includes all persisted user attributes, including sensitive information
 * such as the password hash. 
 *
 * It must **never** be exposed outside the domain or application layers
 * (e.g., to controllers, APIs, or presentation layers).
 *
 * Typical use cases include:
 * - Repository methods that require access to all user fields
 *   (e.g., `findByIdWithSensitiveData` for update operations)
 * - Mapping between persistence models (e.g., database entities)
 *   and domain entities (`User`)
 * - Internal business logic requiring full context of the user
 *
 * This DTO reflects the internal structure of the domain `User` aggregate,
 * but without encapsulation or domain logic.
 */
export interface IUserFullDTO {
    /**
     * Unique user identifier (UUID).
     *
     * Corresponds to the primary key in the persistence layer.
     */
    uuid: string

    /**
     * User's first name.
     *
     * Should be validated and normalized by the domain layer.
     */
    first_name: string

    /**
     * User's last name.
     *
     * Should be validated and normalized by the domain layer.
     */
    last_name: string

    /**
     * User's email address, represented as a domain value object.
     *
     * The `Email` value object ensures the validity of the address
     * and prevents the propagation of invalid data across layers.
     */
    email: Email

    /**
     * User's password, represented as a domain value object.
     *
     * The `Password` value object typically encapsulates:
     * - Validation (minimum length, complexity)
     * - Secure hashing
     * - Comparison methods for authentication
     *
     * This property should contain the **hashed** password value
     * retrieved from the persistence layer.
     */
    password: Password

    /**
     * Timestamp indicating when the user was created.
     *
     * Managed by the persistence layer and immutable after creation.
     */
    createdAt: Date

    /**
     * Timestamp indicating the last update of the user's record.
     *
     * Updated automatically when user data changes.
     */
    updatedAt: Date
}
