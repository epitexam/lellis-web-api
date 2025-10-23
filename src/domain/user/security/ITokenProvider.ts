/**
 * Interface representing a token provider responsible for
 * generating and verifying authentication tokens.
 */
export interface ITokenProvider {
    /**
     * Generates a signed token based on the provided payload.
     *
     * @param payload - The data to include in the token. Typically contains user information or session claims.
     * @param expiresIn - Optional expiration time for the token. 
     * Can be a number (in seconds) or a string (e.g., "1h", "7d").
     * @returns A promise that resolves with the generated token as a string.
     *
     * @example
     * ```ts
     * const token = await tokenProvider.generateToken({ userId: 123 }, "1h");
     * ```
     */
    generateToken(payload: Record<string, any>, expiresIn?: string | number): Promise<string>;

    /**
     * Verifies and decodes a token.
     *
     * @param token - The token string to verify.
     * @returns A promise that resolves with the decoded payload if the token is valid,
     * or `null` if the token is invalid or expired.
     *
     * @example
     * ```ts
     * const decoded = await tokenProvider.verifyToken(token);
     * if (decoded) {
     *   console.log(decoded.userId);
     * }
     * ```
     */
    verifyToken(token: string): Promise<Record<string, any> | null>;
}
