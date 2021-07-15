export interface ISession{
    id: number;
    email: string;
    name: string;
    emailVerified: boolean;
    iat: number;
    exp: number;
}