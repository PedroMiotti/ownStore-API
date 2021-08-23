import resources, {resourceKeys} from "../../../../shared/locals";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";
import { mock } from "jest-mock-extended";
import { IAddressRepository } from "../../ports/IAddressRepository";
import { Address } from "../../../../../domain/address/Address";
import { ISession } from "../../../../../domain/session/ISession";
import { Customer } from "../../../../../domain/customer/Customer";
import { DeleteAddressUseCase } from "./index";
import applicationStatusCodes from "../../../../shared/status/applicationStatusCodes";

const addressRepositoryMock = mock<IAddressRepository>();
const deleteAddressUseCase = new DeleteAddressUseCase(addressRepositoryMock);

const customer: Customer = new Customer("Pedro", "Miotti", "pedromiotti@hotmail.com", true, false, null, 1);
const address: Address = new Address(customer, "Rua barcelona", "112233", "123", "Itaquera", "Itapetininga", "SP", "Brasil", "Apt. 234");
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

describe("Positive address tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        addressRepositoryMock.deleteAddress.mockReset();
        addressRepositoryMock.getAddressById.mockReset();
    });

    it("Should return a success if the address was deleted", async () => {
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(address);
        addressRepositoryMock.deleteAddress.mockResolvedValueOnce("Deleted successfully");

        const result = await deleteAddressUseCase.execute(1, nonAdminSession);

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.SUCCESS);
        expect(result.message).toBe(resources.get(resourceKeys.ADDRESS_OPERATION_SUCCESSFULLY));
    });
});

describe("Negative address tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        addressRepositoryMock.deleteAddress.mockReset();
        addressRepositoryMock.getAddressById.mockReset();
    });

    it("Should return a 400 error if id is not provided", async () => {
        const result = await deleteAddressUseCase.execute(null, nonAdminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: `id`,
            }),
        );
    });

    it("Should return a 500 error if there is an error on the db", async () => {
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(address);
        addressRepositoryMock.deleteAddress.mockResolvedValueOnce(null);

        const result = await deleteAddressUseCase.execute(1, nonAdminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.INTERNAL_ERROR);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_DELETING_ADDRESS));
    });

    it("Should return a 401 error if the address customer id and the session id are different", async () => {
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(address);
        nonAdminSession.id = 2;

        const result = await deleteAddressUseCase.execute(1, nonAdminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.UNAUTHORIZED);
        expect(result.error).toBe(resources.get(resourceKeys.ADDRESS_OPERATION_NOT_AUTHORIZED));
    });

});
