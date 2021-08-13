export class UpdateUserDto {
    id: number = null;
    firstName: string = null;
    lastName: string = null;
    email: string = null;
    isAdmin?: boolean = null;
    isStaff?: boolean = true;
}