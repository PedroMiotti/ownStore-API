export interface IUser{
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    lastLogin: Date;
    isActive: boolean;
    password: string;
    isStaff: boolean;
    createdAt: string;
    emailVerified: boolean;
    isAdmin: boolean;

}