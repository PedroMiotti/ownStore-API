import { ICustomer } from "../../../../domain/customer/Customer.interface";
import {RegisterCustomerDto} from "../dto/RegisterCustomerDto";
import {Customer} from "../../../../domain/customer/Customer";


export interface ICustomerRepository{
    registerCustomer(customer: RegisterCustomerDto): Promise<Customer>;
    getCustomerByEmail(email: string): Promise<Customer>;
    getCustomerById(id: number): Promise<Customer>;
}