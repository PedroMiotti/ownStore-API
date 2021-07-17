import { mock } from "jest-mock-extended";
import resources, { resourceKeys } from "../../../../shared/locals";
import applicationStatusCodes from "../../../../shared/status/applicationStatusCodes";
import { ICustomerRepository } from "../../ports/ICustomerRepository";
import { DeleteCustomerUseCase } from './index';


const customerRepositoryMock = mock<ICustomerRepository>();
const deleteCustomerUseCase = new DeleteCustomerUseCase(customerRepositoryMock);

describe("Positive customer tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        customerRepositoryMock.deleteCustomer.mockReset();
    });

    it("Should return success if the customer was deleted", async() => {
        customerRepositoryMock.deleteCustomer.mockResolvedValueOnce("Deleted successfully");

        const result = await deleteCustomerUseCase.execute(1);

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatusCodes.SUCCESS);
        expect(result.message).toBe(resources.get(resourceKeys.CUSTOMER_DELETED_SUCCESSFULLY));
    })
});

describe("Negative customer tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        customerRepositoryMock.deleteCustomer.mockReset();
    });

    it("Should return a 400 error if id is not provided", async() => {

        const result = await deleteCustomerUseCase.execute(null);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: `id`,
            }),
        );
    });

    it("Should return a 400 error if there is an error on the db", async() => {
        customerRepositoryMock.deleteCustomer.mockResolvedValueOnce(null);


        const result = await deleteCustomerUseCase.execute(1);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_DELETING_CUSTOMER));
    });
});












