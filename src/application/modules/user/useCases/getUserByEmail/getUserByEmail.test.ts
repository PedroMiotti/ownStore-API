import { mock } from "jest-mock-extended";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";
import resources, { resourceKeys } from "../../../../shared/locals";
import { IUserRepository } from "../../ports/IUserRepository";
import { GetUserByEmailUseCase } from './index';
import { User } from "../../../../../domain/user/User";


const userRepositoryMock = mock<IUserRepository>();
const getUserByEmailUseCase = new GetUserByEmailUseCase(userRepositoryMock)

describe("Positive customer test", () => {

    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    })

    beforeEach(() => {
        userRepositoryMock.getUserByEmail.mockReset();
    });

    it("Should return success if the user was found", async() => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com", false, false, "pedro123");
        userRepositoryMock.getUserByEmail.mockResolvedValueOnce(user);

        const result = await getUserByEmailUseCase.execute("pedromiotti@hotmail");

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.SUCCESS);
        expect(result.message).toBe(resources.get(resourceKeys.CUSTOMER_FOUND_SUCCESSFULLY));
    })

})

describe("Negative customer test", () => {

    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    })

    beforeEach(() => {
        userRepositoryMock.getUserByEmail.mockReset();
    });

    it("Should return 400 if the user email is not provided", async() => {

        const result = await getUserByEmailUseCase.execute(null);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: `email`,
            }),
        );
    });

    it("Should return 400 if the user does not exists", async() => {
        userRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);
        
        const result = await getUserByEmailUseCase.execute("pedromiotti@hotmail");

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.USER_DOESNT_EXISTS));
    })

})