import { administratorRepository, userRepository } from "@/adapter/repositories/container";
import { CreateUserUseCase } from "@/application/modules/administrator/useCases/createUser";
import { DeleteUserUseCase } from "@/application/modules/administrator/useCases/deleteUser";
import { UpdateUserUseCase } from "@/application/modules/administrator/useCases/updateUser";

const createUserUseCase = new CreateUserUseCase(administratorRepository, userRepository);
const deleteUserUseCase = new DeleteUserUseCase(administratorRepository, userRepository);
const updateUserUseCase = new UpdateUserUseCase(administratorRepository, userRepository);

export { createUserUseCase, deleteUserUseCase, updateUserUseCase };
