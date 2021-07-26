
export interface ISession{
    id: number;
    email: string;
    name: string;
    emailVerified: boolean;
    isAdmin: boolean;
    isStaff: boolean;
    iat: number;
    exp: number;
}