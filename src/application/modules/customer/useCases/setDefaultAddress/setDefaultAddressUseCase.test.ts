import { Customer } from "../../../../../domain/customer/Customer";
import { Address } from "../../../../../domain/address/Address";
import { mock } from "jest-mock-extended";
import { IAddressRepository } from "../../../address/ports/IAddressRepository";
import { IUserRepository } from "../../../user/ports/IUserRepository";
import { ICustomerRepository } from "../../ports/ICustomerRepository";
import { SetDefaultAddressUseCase } from "./index";
import resources, { resourceKeys } from "../../../../shared/locals";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";
import applicationStatusCodes from "../../../../shared/status/applicationStatusCodes";

const addressRepositoryMock = mock<IAddressRepository>();
const userRepositoryMock = mock<IUserRepository>();
const customerRepositoryMock = mock<ICustomerRepository>();
const setDefaultAddressUseCase = new SetDefaultAddressUseCase(addressRepositoryMock, userRepositoryMock, customerRepositoryMock);

const customer: Customer = new Customer("Pedro", "Miotti", "pedromiotti@hotmail.com", true, false, null, 1);
const address: Address = new Address(customer, "Rua barcelona", "112233", "123", "Itaquera", "Itapetininga", "SP", "Brasil", "Apt. 234");

describe("Positive address tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        addressRepositoryMock.getAddressById.mockReset();
        userRepositoryMock.getUserById.mockReset();
        customerRepositoryMock.setDefaultAddress.mockReset();
    });

    it("Should return a success if the default billing address was set", async () => {
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(address);
        customerRepositoryMock.setDefaultAddress.mockResolvedValueOnce(customer);
        userRepositoryMock.getUserById.mockResolvedValueOnce(customer);

        const result = await setDefaultAddressUseCase.execute(1, address, 0);

        if (result.data instanceof Customer)
            expect(result.data.defaultBillingAddress).toEqual(address);
        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.SUCCESS);
        expect(result.message).toBe(resources.get(resourceKeys.ADDRESS_OPERATION_SUCCESSFULLY));
    });

    it("Should return a success if the default shipping address was set", async () => {
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(address);
        customerRepositoryMock.setDefaultAddress.mockResolvedValueOnce(customer);
        userRepositoryMock.getUserById.mockResolvedValueOnce(customer);

        const result = await setDefaultAddressUseCase.execute(1, address, 1);

        if (result.data instanceof Customer)
            expect(result.data.defaultShippingAddress).toEqual(address);
        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.SUCCESS);
        expect(result.message).toBe(resources.get(resourceKeys.ADDRESS_OPERATION_SUCCESSFULLY));
    });
});

describe("Negative customer tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        customerRepositoryMock.deleteCustomer.mockReset();
    });

    it("Should return a 400 error if id is not provided", async () => {

        const result = await setDefaultAddressUseCase.execute(null, address, 1);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: `id`,
            }),
        );
    });

    it("Should return a 400 error if the address does not exists", async () => {
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(null);

        const result = await setDefaultAddressUseCase.execute(1, address, 1);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.ADDRESS_NOT_FOUND));
    });

    it("Should return a 400 error if the customer does not exists", async () => {
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(address);
        userRepositoryMock.getUserById.mockResolvedValueOnce(null);

        const result = await setDefaultAddressUseCase.execute(1, address, 1);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.USER_DOESNT_EXISTS));
    });

    it("Should return a 500 error if there is an error on the db", async () => {
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(address);
        customerRepositoryMock.setDefaultAddress.mockResolvedValueOnce(null);
        userRepositoryMock.getUserById.mockResolvedValueOnce(customer);

        const result = await setDefaultAddressUseCase.execute(1, address, 1);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.INTERNAL_ERROR);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_UPDATING_ADDRESS));
    });

});


