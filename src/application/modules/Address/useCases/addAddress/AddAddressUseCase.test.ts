import resources, { resourceKeys } from "../../../../shared/locals";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";
import { IAddressRepository } from "../../ports/IAddressRepository";
import { mock } from "jest-mock-extended";
import { IUserRepository } from "../../../user/ports/IUserRepository";
import { AddAddressUseCase } from "./index";
import { Address } from "../../../../../domain/address/Address";
import { Customer } from "../../../../../domain/customer/Customer";

const addressRepositoryMock = mock<IAddressRepository>();
const userRepositoryMock = mock<IUserRepository>();
const addAddressUseCase = new AddAddressUseCase(addressRepositoryMock, userRepositoryMock);

const address: Address = new Address(null, "Rua barcelona", "112233", "123", "Itaquera", "Itapetininga", "SP", "Brasil", "Apt. 234");
const customer: Customer = new Customer("Pedro", "Miotti", "pedromiotti@hotmail.com", true, false);

describe("Positive address tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        userRepositoryMock.getUserById.mockReset();
        addressRepositoryMock.addAddress.mockReset();
    });

    it("Should return a success if the address was added", async () => {
        userRepositoryMock.getUserById.mockResolvedValueOnce(customer);
        addressRepositoryMock.addAddress.mockResolvedValueOnce(address);

        const result = await addAddressUseCase.execute(1, address);

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.CREATED);
        expect(result.message).toBe(resources.get(resourceKeys.ADDRESS_ADDED_SUCCESSFULLY));
    })

})

describe("Negative address tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        userRepositoryMock.getUserById.mockReset();
        addressRepositoryMock.addAddress.mockReset();
    });

    it("Should return a 400 if there is missing address required data", async () => {
        const address: Address = new Address(null, null, null, "123", "Itaquera", null, "SP", "Brasil", "Apt. 234");

        const result = await addAddressUseCase.execute(1, address);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: `streetName, postalCode, city`,
            }),
        );
    })

    it("Should return a 400 if the ID is not provided", async () => {

        const result = await addAddressUseCase.execute(null, address);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: `customerID`,
            }),
        );
    })

    it("Should return a 400 if the customer was not found", async () => {
        userRepositoryMock.getUserById.mockResolvedValueOnce(null);

        const result = await addAddressUseCase.execute(1, address);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.USER_DOESNT_EXISTS));
    })

    it("Should return a 500 if there was an error registering the address", async () => {
        userRepositoryMock.getUserById.mockResolvedValueOnce(customer);
        addressRepositoryMock.addAddress.mockResolvedValueOnce(null);

        const result = await addAddressUseCase.execute(1, address);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.INTERNAL_ERROR);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_ADDING_ADDRESS));
    })

})