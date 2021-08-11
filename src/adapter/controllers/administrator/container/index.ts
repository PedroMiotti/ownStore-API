import { administratorRepository, userRepository } from "@/adapter/repositories/container";
import { CreateUserUseCase } from "@/application/modules/administrator/useCases/createUser";

const createUserUseCase = new CreateUserUseCase(administratorRepository, userRepository);

export { createUserUseCase };
