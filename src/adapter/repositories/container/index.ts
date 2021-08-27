import { AdministratorRepository } from "@/adapter/repositories/Administrator/AdministratorRepository";
import { UserRepository } from "@/adapter/repositories/User/UserRepository";
import { StaffRepository } from "@/adapter/repositories/staff/StaffRepository";
import { CustomerRepository } from "@/adapter/repositories/Customer/CustomerRepository";
import { AddressRepository } from "@/adapter/repositories/Address/AddressRepository";

const administratorRepository = new AdministratorRepository();
const userRepository = new UserRepository();
const staffRepository = new StaffRepository();
const customerRepository = new CustomerRepository();
const addressRepository = new AddressRepository();

export { administratorRepository, userRepository, staffRepository, customerRepository, addressRepository }