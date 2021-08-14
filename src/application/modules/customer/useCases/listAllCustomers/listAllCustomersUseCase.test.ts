import resources, {resourceKeys} from "../../../../shared/locals";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";
import { mock } from "jest-mock-extended";
import { ListAllCustomersUseCase } from "./index";
import { ICustomerRepository } from "../../ports/ICustomerRepository";
import {Customer} from "../../../../../domain/customer/Customer";

const customerRepositoryMock = mock<ICustomerRepository>();
const listAllUsersUseCases = new ListAllCustomersUseCase(customerRepositoryMock);

describe("Positive user-admin tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        customerRepositoryMock.listAllCustomers.mockReset();
    });

    it("Should return a success all customers were returned", async () => {
        const user: Customer = new Customer("Pedro", "Miotti", "pedromiotti@hotmail.com",false, true);
        const user2: Customer = new Customer("Thiago", "Miotti", "thiagomiotti@hotmail.com",false, false );

        customerRepositoryMock.listAllCustomers.mockResolvedValueOnce([user, user2]);

        const result = await listAllUsersUseCases.execute();

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.SUCCESS);
        expect(result.message).toBe(resources.get(resourceKeys.USERS_RETRIEVED_SUCCESSFULLY));
    })

})