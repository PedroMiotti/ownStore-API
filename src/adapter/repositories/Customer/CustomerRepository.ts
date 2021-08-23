import { ICustomerRepository } from "@/application/modules/customer/ports/ICustomerRepository";
import { Customer } from "@/domain/customer/Customer";
import { BaseRepository } from "@/adapter/repositories/base/BaseRepository";
import UserModel from "@/infrastructure/models/user/user.model";
import logger from "@/application/shared/logger";
import { CreateUserDto } from "@/application/modules/administrator/dto/CreateUserDto";
import {UpdateUserDto} from "@/application/modules/administrator/dto/UpdateUserDto";
import {Address} from "@/domain/address/Address";

export class CustomerRepository extends BaseRepository implements ICustomerRepository{
    deleteCustomer(id: number): Promise<string> {
        return UserModel.delete(id)
            .then((res: string) => {
                return res;
            }).catch((e) => {
                logger.error("Error when deleting customer : ", e);
                return Promise.reject(e);
            });
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
    
    updateCustomer(customer: UpdateUserDto): Promise<Customer> {
        return UserModel.update(customer)
            .then((c: Customer) => {
                return c;
            }).catch((e) => {
                logger.error("Error when updating staff user : ", e);
                return Promise.reject(e);
            });
    }

    setDefaultAddress(customer: Customer, address: Address, billingOrShipping: number): Promise<Customer> {
        return Promise.resolve(undefined);
    }

}

