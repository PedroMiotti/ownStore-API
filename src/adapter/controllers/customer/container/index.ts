import {administratorRepository, staffRepository, userRepository, customerRepository} from "@/adapter/repositories/container";
import {RegisterCustomerUseCase} from "@/application/modules/customer/useCases/registerCustomer";

const registerCustomerUseCase = new RegisterCustomerUseCase(customerRepository, userRepository);

export { registerCustomerUseCase };