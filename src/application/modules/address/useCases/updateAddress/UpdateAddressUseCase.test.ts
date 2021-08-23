import resources, { resourceKeys } from "../../../../shared/locals";
import { mock } from "jest-mock-extended";
import { IAddressRepository } from "../../ports/IAddressRepository";
import { UpdateAddressUseCase } from "./index";
import { Address } from "../../../../../domain/address/Address";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";

const addressRepositoryMock = mock<IAddressRepository>();
const updateAddressUseCase = new UpdateAddressUseCase(addressRepositoryMock);

const address: Address = new Address(null, "Rua barcelona", "112233", "123", "Itaquera", "Itapetininga", "SP", "Brasil", "Apt. 234");

describe("Positive address tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        addressRepositoryMock.updateAddress.mockReset();
        addressRepositoryMock.getAddressById.mockReset();
    });

    it("Should return a success if the address was updated", async () => {
        addressRepositoryMock.updateAddress.mockResolvedValueOnce(address);
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(address);

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
    });

    it("Should return a 400 if the address was not found", async () => {
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(null);

        const result = await updateAddressUseCase.execute(address);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.ADDRESS_NOT_FOUND));
    });

    it("Should return a 500 if there was an error updating the address", async () => {
        addressRepositoryMock.updateAddress.mockResolvedValueOnce(null);
        addressRepositoryMock.getAddressById.mockResolvedValueOnce(address);

        const result = await updateAddressUseCase.execute( address);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.INTERNAL_ERROR);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_UPDATING_ADDRESS));
    });
});