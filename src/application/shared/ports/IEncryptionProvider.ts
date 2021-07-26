export interface IEncryptionProvider {
    getSalt(rounds: number): string;
    hashPassword(passwd: string, salt: string | number): string;
}