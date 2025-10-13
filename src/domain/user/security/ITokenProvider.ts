export interface ITokenProvider {
    generateToken(payload: Record<string, any>, expiresIn?: string | number): Promise<string>;
    verifyToken(token: string): Promise<Record<string, any> | null>;
}
