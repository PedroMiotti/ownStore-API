import {administratorRepository, staffRepository, userRepository, customerRepository} from "@/adapter/repositories/container";
import { CreateUserUseCase } from "@/application/modules/administrator/useCases/createUser";
import { DeleteUserUseCase } from "@/application/modules/administrator/useCases/deleteUser";
import { UpdateUserUseCase } from "@/application/modules/administrator/useCases/updateUser";
import { ListAllStaffUseCase } from "@/application/modules/staff/useCases/listAllStaff";
import {ListAllCustomersUseCase} from "@/application/modules/customer/useCases/listAllCustomers";

const createUserUseCase = new CreateUserUseCase(administratorRepository, userRepository);
const deleteUserUseCase = new DeleteUserUseCase(administratorRepository, userRepository);
const updateUserUseCase = new UpdateUserUseCase(administratorRepository, userRepository);
const listAllStaffUseCase = new ListAllStaffUseCase(staffRepository);
const listAllCustomersUseCase= new ListAllCustomersUseCase(customerRepository);

export { createUserUseCase, deleteUserUseCase, updateUserUseCase, listAllStaffUseCase, listAllCustomersUseCase };
