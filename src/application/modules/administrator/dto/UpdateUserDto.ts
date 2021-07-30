export class UpdateUserDto {
    id: string = null;
    firstName: string = null;
    lastName: string = null;
    email: string = null;
    isAdmin?: boolean = null;
    isStaff?: boolean = true;
}