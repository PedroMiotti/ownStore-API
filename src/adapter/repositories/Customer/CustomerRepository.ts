import { ICustomerRepository } from "@/application/modules/customer/ports/ICustomerRepository";
import { Customer } from "@/domain/customer/Customer";
import { CustomerProfileDto } from "@/application/modules/customer/dto/CustomerProfileDto";
import { BaseRepository } from "@/adapter/repositories/base/BaseRepository";
import UserModel from "@/infrastructure/models/user/user.model";
import logger from "@/application/shared/logger";
import {CreateUserDto} from "@/application/modules/administrator/dto/CreateUserDto";

export class CustomerRepository extends BaseRepository implements ICustomerRepository{
    deleteCustomer(id: number): Promise<string> {
        return Promise.resolve("");
    }

    listAllCustomers(): Promise<Customer[]> {
        return UserModel.getAllCustomerUsers()
            .then((customers: Customer[]) => {
                return customers;
            }).catch((e) => {
                logger.error("Error when retrieving all customers : ", e);
                return Promise.reject(e);
            });
    }

    registerCustomer(customer: CreateUserDto): Promise<Customer> {
        return UserModel.create(customer)
            .then((c: Customer) => {
                return c;
            }).catch((e) => {
                logger.error("Error when creating customer : ", e);
                return Promise.reject(e);
            });
    }

    updateCustomer(customer: CustomerProfileDto): Promise<Customer> {
        return Promise.resolve(undefined);
    }

}