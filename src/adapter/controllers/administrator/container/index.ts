import {administratorRepository, staffRepository, userRepository} from "@/adapter/repositories/container";
import { CreateUserUseCase } from "@/application/modules/administrator/useCases/createUser";
import { DeleteUserUseCase } from "@/application/modules/administrator/useCases/deleteUser";
import { UpdateUserUseCase } from "@/application/modules/administrator/useCases/updateUser";
import { ListAllStaffUseCase } from "@/application/modules/staff/useCases/listAllStaff";

const createUserUseCase = new CreateUserUseCase(administratorRepository, userRepository);
const deleteUserUseCase = new DeleteUserUseCase(administratorRepository, userRepository);
const updateUserUseCase = new UpdateUserUseCase(administratorRepository, userRepository);
const listAllStaffUseCase = new ListAllStaffUseCase(staffRepository);

export { createUserUseCase, deleteUserUseCase, updateUserUseCase, listAllStaffUseCase };
