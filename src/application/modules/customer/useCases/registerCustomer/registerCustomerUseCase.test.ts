import { RegisterCustomerUseCase } from "./index";
import { ICustomerRepository } from "../../ports/ICustomerRepository";
import { mock } from "jest-mock-extended";
import { Customer } from "../../../../../domain/customer/Customer";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";
import resources, { resourceKeys } from "../../../../shared/locals";
import { IEmailProvider } from "../../../email/ports/IEmailProvider";
import { IUserRepository } from "../../../user/ports/IUserRepository";


const customerRepositoryMock = mock<ICustomerRepository>();
const userRepositoryMock = mock<IUserRepository>();
const registerCustomerUseCase = new RegisterCustomerUseCase(customerRepositoryMock, userRepositoryMock);

describe("Positive customer tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        userRepositoryMock.getUserById.mockReset();
        userRepositoryMock.getUserByEmail.mockReset();
        customerRepositoryMock.registerCustomer.mockReset();

    });

    it("Should return a success if the customer was registered", async () => {
        const customer = new Customer("Pedro", "Miotti", "pedromiotti7@gmail.com", false, false, "pedro123");
        userRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);
        customerRepositoryMock.registerCustomer.mockResolvedValueOnce(customer);

        const result = await registerCustomerUseCase.execute(customer);

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.CREATED);
        expect(result.message).toBe(resources.get(resourceKeys.CUSTOMER_CREATED_SUCCESSFULLY));
    })
})

describe("Negative customer tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        userRepositoryMock.getUserByEmail.mockReset();
        customerRepositoryMock.registerCustomer.mockReset();
    });

    it("should return a 400 error if customer with the same email already exists", async () => {
        const customer = new Customer("Pedro", "Miotti", "pedromiotti7@gmail.com", false, false, "pedro123");
        userRepositoryMock.getUserByEmail.mockResolvedValueOnce(customer);

        const result = await registerCustomerUseCase.execute(customer);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.EMAIL_ALREADY_IN_USE, {
                email: customer.email,
            }),
        );
    })

    it("should return a 400 error if the customer does not provide all the required information ", async () => {
        const customer = new Customer("Pedro", "Miotti", "pedromiotti7@gmail.com",false, false, null);
        userRepositoryMock.getUserByEmail.mockResolvedValueOnce(customer);

        const result = await registerCustomerUseCase.execute(customer);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: `password`,
            }),
        );
    })

    it("should return a 400 error if the customer info is null or undefined", async () => {
        const customer = new Customer(null, null, null,false, false, null);
        userRepositoryMock.getUserByEmail.mockResolvedValueOnce(customer);

        const result = await registerCustomerUseCase.execute(customer);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: `email, firstName, lastName, password`,
            }),
        );
    })

    it("should return a 400 error if there is an error while registering the user on the database", async () => {
        const customer = new Customer("Pedro", "Miotti", "pedromiotti7@gmail.com",false, false, "pedro123");
        userRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);
        customerRepositoryMock.registerCustomer.mockResolvedValueOnce(null);

        const result = await registerCustomerUseCase.execute(customer);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_CREATING_CUSTOMER));
    })
})