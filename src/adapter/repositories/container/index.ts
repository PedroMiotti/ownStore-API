import { AdministratorRepository } from "@/adapter/repositories/Administrator/AdministratorRepository";
import {UserRepository} from "@/adapter/repositories/User/UserRepository";

const administratorRepository = new AdministratorRepository();
const userRepository = new UserRepository();

export { administratorRepository, userRepository }