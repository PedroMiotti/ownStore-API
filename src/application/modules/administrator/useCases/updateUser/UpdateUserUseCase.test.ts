import resources, { resourceKeys } from "../../../../shared/locals";
import { User } from "../../../../../domain/user/User";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";
import { mock } from "jest-mock-extended";
import { IAdminRepository } from "../../ports/AdminRepository";
import { UpdateUserDto } from "../../dto/UpdateUserDto";
import { ISession } from "../../../../../domain/session/ISession";
import { UpdateUserUseCase } from "./index";


const adminRepositoryMock = mock<IAdminRepository>();
const updateUserUseCase = new UpdateUserUseCase(adminRepositoryMock);

const userUpdatedNonAdmin: UpdateUserDto = {
    id: "1",
    firstName: "Pedro",
    lastName: "Miotti",
    email: "pedromiotti@hotmail.com",
    isAdmin: false,
    isStaff: true
}
const userUpdateAdmin: UpdateUserDto = {
    id: "1",
    firstName: "Pedro",
    lastName: "Miotti",
    email: "pedromiotti@hotmail.com",
    isAdmin: true,
    isStaff: true
}

const adminSession: ISession = {
    id: 1,
    email: "pedromiotti@hotmail.com",
    name: "Pedro Miotti",
    emailVerified: true,
    isAdmin: true,
    isStaff: true,
    exp: 12,
    iat: 1
};
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

describe("Positive user-admin tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        adminRepositoryMock.updateUser.mockReset();
        adminRepositoryMock.getUserByEmail.mockReset();
        adminRepositoryMock.getUserById.mockReset();
    });

    it("Should return a success if a non-admin user was updated", async () => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com", true, false);

        adminRepositoryMock.getUserById.mockResolvedValueOnce(user);
        adminRepositoryMock.updateUser.mockResolvedValueOnce(user);
        adminRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);

        const result = await updateUserUseCase.execute(userUpdatedNonAdmin, nonAdminSession);

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.CREATED);
        expect(result.message).toBe(resources.get(resourceKeys.USER_UPDATED_SUCCESSFULLY));
    })

    it("Should return a success if a admin user was updated", async () => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com", true, true);

        adminRepositoryMock.getUserById.mockResolvedValueOnce(user);
        adminRepositoryMock.updateUser.mockResolvedValueOnce(user);
        adminRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);

        const result = await updateUserUseCase.execute(userUpdateAdmin, adminSession);

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.CREATED);
        expect(result.message).toBe(resources.get(resourceKeys.USER_UPDATED_SUCCESSFULLY));
    })

    it("Should return a success if a non-admin user was updated - email change", async () => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti_2@hotmail.com", true, true);

        adminRepositoryMock.getUserById.mockResolvedValueOnce(user);
        adminRepositoryMock.updateUser.mockResolvedValueOnce(user);
        adminRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);

        const result = await updateUserUseCase.execute(userUpdateAdmin, adminSession);

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.CREATED);
        expect(result.message).toBe(resources.get(resourceKeys.USER_UPDATED_SUCCESSFULLY));
    })

    it("Should return a success if a non-admin user was updated - role change", async () => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com", true, false);

        adminRepositoryMock.getUserById.mockResolvedValueOnce(user);
        adminRepositoryMock.updateUser.mockResolvedValueOnce(user);
        adminRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);

        const result = await updateUserUseCase.execute(userUpdateAdmin, adminSession);

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.CREATED);
        expect(result.message).toBe(resources.get(resourceKeys.USER_UPDATED_SUCCESSFULLY));
    })
})

describe("Negative user-admin tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        adminRepositoryMock.updateUser.mockReset();
        adminRepositoryMock.getUserByEmail.mockReset();
        adminRepositoryMock.getUserById.mockReset();
    });

    it("Should return a 401 error if the user is not a admin and wants to update a admin user", async () => {
        const result = await updateUserUseCase.execute(userUpdateAdmin, nonAdminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.UNAUTHORIZED);
        expect(result.error).toBe(resources.get(resourceKeys.OPERATION_NOT_AUTHORIZED_ADMIN_ONLY));
    })

    it("Should return a 400 error if the user does not exists", async () => {
        adminRepositoryMock.getUserById.mockResolvedValueOnce(null);

        const result = await updateUserUseCase.execute(userUpdateAdmin, adminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.get(resourceKeys.USER_DOESNT_EXISTS));
    })

    it("Should return a 400 error if the user wants to update the email and the email is already in use", async () => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti_2@hotmail.com", true, false);

        adminRepositoryMock.getUserById.mockResolvedValueOnce(user);
        adminRepositoryMock.getUserByEmail.mockResolvedValueOnce(user);

        const result = await updateUserUseCase.execute(userUpdateAdmin, adminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(resources.getWithParams(resourceKeys.EMAIL_ALREADY_IN_USE, {
            email: user.email,
        }));
    })

    it("Should return a 401 error if wants to update the role of a user to admin but the user is not an admin", async () => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com", true, false);

        adminRepositoryMock.getUserById.mockResolvedValueOnce(user);
        adminRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);

        const result = await updateUserUseCase.execute(userUpdateAdmin, nonAdminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.UNAUTHORIZED);
        expect(result.error).toBe(resources.get(resourceKeys.OPERATION_NOT_AUTHORIZED_ADMIN_ONLY));
    })

    it("Should return a 500 error if there was an error while updating the user", async () => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com", true, true);

        adminRepositoryMock.getUserById.mockResolvedValueOnce(user);
        adminRepositoryMock.updateUser.mockResolvedValueOnce(null);
        adminRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);

        const result = await updateUserUseCase.execute(userUpdateAdmin, adminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.INTERNAL_ERROR);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_UPDATING_USER));
    })

})
