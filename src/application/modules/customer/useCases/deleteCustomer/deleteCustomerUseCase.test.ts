import {mock} from "jest-mock-extended";
import resources, {resourceKeys} from "../../../../shared/locals";
import applicationStatusCodes from "../../../../shared/status/applicationStatusCodes";
import {ICustomerRepository} from "../../ports/ICustomerRepository";
import {DeleteCustomerUseCase} from './index';
import {ISession} from "../../../../../domain/session/ISession";


const customerRepositoryMock = mock<ICustomerRepository>();
const deleteCustomerUseCase = new DeleteCustomerUseCase(customerRepositoryMock);

const nonAdminSession: ISession = {
    id: 1,
    email: "pedromiotti@hotmail.com",
    name: "Pedro Miotti",
    emailVerified: true,
    isAdmin: false,
    isStaff: true,
    exp: 12,
    iat: 1
};

describe("Positive customer tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        customerRepositoryMock.deleteCustomer.mockReset();
    });

    it("Should return success if the customer was deleted", async () => {
        customerRepositoryMock.deleteCustomer.mockResolvedValueOnce("Deleted successfully");

        const result = await deleteCustomerUseCase.execute(1, nonAdminSession);

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

    it("Should return a 400 error if id is not provided", async () => {

        const result = await deleteCustomerUseCase.execute(null, nonAdminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: `id`,
            }),
        );
    });

    it("Should return a 500 error if there is an error on the db", async () => {
        customerRepositoryMock.deleteCustomer.mockResolvedValueOnce(null);

        const result = await deleteCustomerUseCase.execute(1, nonAdminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.INTERNAL_ERROR);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_DELETING_CUSTOMER));
    });

    it("Should return a 401 error if the customer id and the session id are different", async () => {
        customerRepositoryMock.deleteCustomer.mockResolvedValueOnce(null);

        const result = await deleteCustomerUseCase.execute(2, nonAdminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.UNAUTHORIZED);
        expect(result.error).toBe(resources.get(resourceKeys.DELETE_CUSTOMER_NOT_AUTHORIZED));
    });
});












