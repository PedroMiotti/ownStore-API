import { Customer } from "@/domain/customer/Customer";
import { CreateUserDto } from "@/application/modules/administrator/dto/CreateUserDto";
import { UpdateUserDto } from "@/application/modules/administrator/dto/UpdateUserDto";


export interface ICustomerRepository{
    registerCustomer(customer: CreateUserDto): Promise<Customer>;
    updateCustomer(customer: UpdateUserDto): Promise<Customer>;
    deleteCustomer(id: number): Promise<string>;
    listAllCustomers(): Promise<Customer[]>;
}

