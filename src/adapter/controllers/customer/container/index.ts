import {administratorRepository, staffRepository, userRepository, customerRepository} from "@/adapter/repositories/container";
import { authProvider } from "@/adapter/providers/container";
import { RegisterCustomerUseCase } from "@/application/modules/customer/useCases/registerCustomer";
import {UpdateCustomerProfileUseCase} from "@/application/modules/customer/useCases/UpdateCustomerProfile";

const registerCustomerUseCase = new RegisterCustomerUseCase(customerRepository, userRepository);
const updateCustomerUseCase = new UpdateCustomerProfileUseCase(customerRepository, authProvider, userRepository);

export { registerCustomerUseCase, updateCustomerUseCase };