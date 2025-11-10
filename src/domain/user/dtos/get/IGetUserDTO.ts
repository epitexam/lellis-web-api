/**
 * @file IGetUserDto.ts
 * @description
 * Data Transfer Object (DTO) used to identify a user by its unique identifier.
 *
 * This DTO is intentionally minimal: it carries only the identifier required
 * to fetch or reference a user across application boundaries (use cases,
 * repositories, services). It should **not** contain sensitive or mutable
 * profile data.
 *
 * Common usage:
 * - Input for "get user" / "find user" use cases.
 * - Lightweight payload when referencing a user in other domain operations.
 *
 * @example
 * ```ts
 * // Fetch user by UUID
 * const request: IGetUserDto = { uuid: "3fa85f64-5717-4562-b3fc-2c963f66afa6" };
 * const result = await getUserUseCase.execute(request);
 * ```
 *
 * @example JSON
 * ```json
 * { "uuid": "3fa85f64-5717-4562-b3fc-2c963f66afa6" }
 * ```
 */
export interface IGetUserDto {
    /**
     * The user's unique identifier.
     *
     * Expected to be a UUID (RFC 4122) string. Consumers should validate format
     * if necessary before using this value in database queries or internal logic.
     */
    uuid: string;
}
