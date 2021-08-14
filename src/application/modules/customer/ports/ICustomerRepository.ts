import {RegisterCustomerDto} from "../dto/RegisterCustomerDto";
import {Customer} from "@/domain/customer/Customer";
import { CustomerProfileDto } from "../dto/CustomerProfileDto";


export interface ICustomerRepository{
    registerCustomer(customer: RegisterCustomerDto): Promise<Customer>;
    updateCustomer(customer: CustomerProfileDto): Promise<Customer>;
    deleteCustomer(id: number): Promise<string>;
    listAllCustomers(): Promise<Customer[]>;
}

