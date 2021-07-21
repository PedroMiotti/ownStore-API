import {mock} from "jest-mock-extended";
import {ICustomerRepository} from "../../ports/ICustomerRepository";
import {IAuthProvider} from "../../../auth/ports/IAuthProvider";
import {UpdateCustomerProfileUseCase} from "./index";
import resources, {resourceKeys} from "../../../../shared/locals";
import {UserLoginDto} from "../../../auth/dto/UserLoginDto";
import {User} from "../../../../../domain/user/User";
import {TokenDto} from "../../../auth/dto/TokenDto";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";
import { Customer } from "../../../../../domain/customer/Customer";
import { CustomerProfileDto } from "../../dto/CustomerProfileDto";


const customerRepositoryMock = mock<ICustomerRepository>();
const authProviderMock = mock<IAuthProvider>();
const updateCustomerProfile = new UpdateCustomerProfileUseCase(customerRepositoryMock, authProviderMock);

const found_customer: Customer = new Customer("Pedro", "Miotti", "pedromiotti@hotmail.com", false, false);
const customer: CustomerProfileDto = {firstName: "Pedro", lastName: "Miotti", phone: "1522222"};


describe("Positive auth tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        authProviderMock.login.mockReset();
    });

    it("Should return a success if the customer profile was updated", async () => {
        customerRepositoryMock.getCustomerById.mockResolvedValueOnce(found_customer);
        customerRepositoryMock.updateCustomer.mockResolvedValueOnce(found_customer);

        const result = await updateCustomerProfile.execute(customer, 1);

        const data = result.data as TokenDto;
        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.SUCCESS);
        expect(result.message).toBe(resources.get(resourceKeys.CUSTOMER_UPDATED_SUCCESSFULLY));
        expect(data.expireIn).toBe(365 * 24 * 60 * 60 * 1000);
    })

});

describe("Negative auth tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        authProviderMock.login.mockReset();
    });

    it("Should return a 400 error if the customer info is null", async () => {
        const customerNull: CustomerProfileDto = null;

        const result = await updateCustomerProfile.execute(customerNull, 1);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_UPDATING_CUSTOMER));
    });

    it("Should return a 400 error if the customer id is null", async () => {

        const result = await updateCustomerProfile.execute(customer, null);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_UPDATING_CUSTOMER));
    });

    it("Should return a 400 error if the customer does not exists", async () => {
        customerRepositoryMock.getCustomerById.mockResolvedValueOnce(null);

        const result = await updateCustomerProfile.execute(customer, 1);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.USER_DOESNT_EXISTS));
    });

    it("Should return a 400 error if there is an error updating the customer", async () => {
        customerRepositoryMock.getCustomerById.mockResolvedValueOnce(found_customer);
        customerRepositoryMock.updateCustomer.mockResolvedValueOnce(null);

        const result = await updateCustomerProfile.execute(customer, 1);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_UPDATING_CUSTOMER));
    });

});














