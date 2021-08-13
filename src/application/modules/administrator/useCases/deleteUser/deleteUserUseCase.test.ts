import { mock } from "jest-mock-extended";
import { IAdminRepository } from "../../ports/IAdminRepository";
import { DeleteUserUseCase } from "./index";
import resources, { resourceKeys } from "../../../../shared/locals";
import applicationStatusCodes from "../../../../shared/status/applicationStatusCodes";
import { ISession } from "../../../../../domain/session/ISession";
import { IUserRepository } from "../../../user/ports/IUserRepository";
import { User } from "../../../../../domain/user/User";

const adminRepository = mock<IAdminRepository>();
const userRepository = mock<IUserRepository>()
const deleteUserUseCase = new DeleteUserUseCase(adminRepository, userRepository);

const adminSession: ISession = {id: 1, email: "pedromiotti@hotmail.com", name: "Pedro Miotti", emailVerified: true, isAdmin: true, isStaff: true, exp: 12, iat: 1};
const nonAdminSession: ISession = {id: 1, email: "pedromiotti@hotmail.com", name: "Pedro Miotti", emailVerified: true, isAdmin: false, isStaff: true, exp: 12, iat: 1};

describe("Positive user-admin tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        adminRepository.deleteUser.mockReset();
        userRepository.getUserById.mockReset();
    });

    it("Should return success if the user was deleted", async() => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com", true, false);
        userRepository.getUserById.mockResolvedValueOnce(user);
        adminRepository.deleteUser.mockResolvedValueOnce("Deleted successfully");

        const result = await deleteUserUseCase.execute(1, adminSession);

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatusCodes.SUCCESS);
        expect(result.message).toBe(resources.get(resourceKeys.USER_DELETED_SUCCESSFULLY));
    })
});

describe("Negative user-admin tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        adminRepository.deleteUser.mockReset();
    });

    it("Should return a 400 error if the user id is not provided", async() => {
        const result = await deleteUserUseCase.execute(null, adminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: "id",
            }),
        );
    });

    it("Should return a 401 error if the user is not a admin", async() => {
        const result = await deleteUserUseCase.execute(1, nonAdminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.UNAUTHORIZED);
        expect(result.error).toBe(resources.get(resourceKeys.DELETE_USER_NOT_AUTHORIZED));
    });

    it("Should return a 400 error if the user does not exists", async() => {
        userRepository.getUserById.mockResolvedValueOnce(null);
        const result = await deleteUserUseCase.execute(1, adminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.USER_DOESNT_EXISTS));
    });

    it("Should return a 500 error if there was an error on db", async() => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com", true, false);
        userRepository.getUserById.mockResolvedValueOnce(user);
        adminRepository.deleteUser.mockResolvedValueOnce(null);

        const result = await deleteUserUseCase.execute(1, adminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatusCodes.INTERNAL_ERROR);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_DELETING_USER));
    });
});