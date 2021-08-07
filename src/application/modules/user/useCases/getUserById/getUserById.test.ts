import { mock } from "jest-mock-extended";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";
import resources, { resourceKeys } from "../../../../shared/locals";
import { IUserRepository } from "../../ports/IUserRepository";
import { GetUserByIdUseCase} from './index';
import { User } from "../../../../../domain/user/User";


const userRepositoryMock = mock<IUserRepository>();
const getUserByIdUseCase = new GetUserByIdUseCase(userRepositoryMock)

describe("Positive user test", () => {

    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    })

    beforeEach(() => {
        userRepositoryMock.getUserById.mockReset();
    });

    it("Should return success if the user was found", async() => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com", false, false, "pedro123");
        userRepositoryMock.getUserById.mockResolvedValueOnce(user);

        const result = await getUserByIdUseCase.execute(1);

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.SUCCESS);
        expect(result.message).toBe(resources.get(resourceKeys.CUSTOMER_FOUND_SUCCESSFULLY));
    })

})

describe("Negative user test", () => {

    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    })

    beforeEach(() => {
        userRepositoryMock.getUserById.mockReset();
    });

    it("Should return 400 if the user id is not provided", async() => {

        const result = await getUserByIdUseCase.execute(null);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: `id`,
            }),
        );
    });

    it("Should return 400 if the user does not exists", async() => {
        userRepositoryMock.getUserById.mockResolvedValueOnce(null);
        
        const result = await getUserByIdUseCase.execute(1);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.USER_DOESNT_EXISTS));
    })

})