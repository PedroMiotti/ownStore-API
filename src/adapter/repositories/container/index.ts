import { AdministratorRepository } from "@/adapter/repositories/Administrator/AdministratorRepository";
import {UserRepository} from "@/adapter/repositories/User/UserRepository";
import {StaffRepository} from "@/adapter/repositories/staff/StaffRepository";

const administratorRepository = new AdministratorRepository();
const userRepository = new UserRepository();
const staffRepository = new StaffRepository();

export { administratorRepository, userRepository, staffRepository }