import resources, { resourceKeys } from "../../../../shared/locals";
import { mock } from "jest-mock-extended";
import { IAddressRepository } from "../../ports/IAddressRepository";
import { UpdateAddressUseCase } from "./index";
import { Address } from "../../../../../domain/address/Address";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";
import { AddressDto } from "../../dto/AddressDto";
import { Customer } from "../../../../../domain/customer/Customer";
import { IUserRepository } from "../../../user/ports/IUserRepository";

const addressRepositoryMock = mock<IAddressRepository>();
const userRepositoryMock = mock<IUserRepository>();
const updateAddressUseCase = new UpdateAddressUseCase(addressRepositoryMock, userRepositoryMock);

const address: AddressDto = {
    customerId: 1,
    streetName: "Rua barcelona",
    postalCode: "112233",
    number: "123",
    neighborhood: "Itaquera",
    city: "Itapetininga",
    state: "SP",
    country: "Brasil",
    complement: "Apt. 234"
};

const returnedAddress: Address = new Address(null, "Rua barcelona", "112233", "123", "Itaquera", "Itapetininga", "SP", "Brasil", "Apt. 234");
const customer: Customer = new Customer("Pedro", "Miotti", "pedromiotti@hotmail.com", true, false);


describe("Positive address tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        addressRepositoryMock.updateAddress.mockReset();
        addressRepositoryMock.getAddressById.mockReset();
        userRepositoryMock.getUserById.mockReset();
    });

    it("Should return a success if the address was updated", async () => {
        addressRepositoryMock.updateAddress.mockResolvedValueOnce(returnedAddress);
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(returnedAddress);
        userRepositoryMock.getUserById.mockResolvedValueOnce(customer);


        const result = await updateAddressUseCase.execute(address);

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
        addressRepositoryMock.updateAddress.mockReset();
        userRepositoryMock.getUserById.mockReset();
    });

    it("Should return a 400 if the address was not found", async () => {
        userRepositoryMock.getUserById.mockResolvedValueOnce(customer);
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(null);

        const result = await updateAddressUseCase.execute(address);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.ADDRESS_NOT_FOUND));
    });

    it("Should return a 500 if there was an error updating the address", async () => {
        addressRepositoryMock.updateAddress.mockResolvedValueOnce(null);
        userRepositoryMock.getUserById.mockResolvedValueOnce(customer);
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(returnedAddress);

        const result = await updateAddressUseCase.execute(address);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.INTERNAL_ERROR);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_UPDATING_ADDRESS));
    });

    it("Should return a 400 if the customer was not found", async () => {
        userRepositoryMock.getUserById.mockResolvedValueOnce(null);

        const result = await updateAddressUseCase.execute(address);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.USER_DOESNT_EXISTS));
    })
});