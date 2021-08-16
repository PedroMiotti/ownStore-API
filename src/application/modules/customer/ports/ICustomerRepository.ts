import { Customer } from "@/domain/customer/Customer";
import { CustomerProfileDto } from "../dto/CustomerProfileDto";
import { CreateUserDto } from "@/application/modules/administrator/dto/CreateUserDto";


export interface ICustomerRepository{
    registerCustomer(customer: CreateUserDto): Promise<Customer>;
    updateCustomer(customer: CustomerProfileDto): Promise<Customer>;
    deleteCustomer(id: number): Promise<string>;
    listAllCustomers(): Promise<Customer[]>;
}

