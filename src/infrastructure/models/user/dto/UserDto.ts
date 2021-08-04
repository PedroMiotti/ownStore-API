export class UserDto {
    id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    emailVerified?: boolean;
    password?: string;
    lastLogin?: string;
    isActive?: boolean;
    isStaff?: boolean;
    isAdmin?: boolean;
    createdAt?: string;
}