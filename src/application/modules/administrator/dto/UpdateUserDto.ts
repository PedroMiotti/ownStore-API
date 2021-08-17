export class UpdateUserDto {
    id: number = null;
    firstName: string = null;
    lastName: string = null;
    email: string = null;
    isAdmin?: boolean = null;
    isStaff?: boolean = true;
    gender?: number = null;
    phone?: string = null;
    dateOfBirth?: string = null;
    defaultShippingAddress?: number = null;
    defaultBillingAddress?: number = null;
}