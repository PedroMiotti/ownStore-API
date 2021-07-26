export class CreateUserDto {
    firstName: string = null;
    lastName: string = null;
    email: string = null;
    isAdmin: boolean = null;
    isStaff: boolean = true;
    createdAt?: string = null;
    password?: string = null;
}