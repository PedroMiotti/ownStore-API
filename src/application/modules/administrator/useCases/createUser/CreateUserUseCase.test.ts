import resources, { resourceKeys } from "../../../../shared/locals";
import { User } from "../../../../../domain/user/User";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";
import { IAdminRepository } from "../../ports/AdminRepository";
import { mock } from "jest-mock-extended";
import { CreateUserUseCase } from "./index";
import { CreateUserDto } from "../../dto/CreateUserDto";
import { ISession } from "../../../../../domain/session/ISession";

const adminRepositoryMock = mock<IAdminRepository>();
const createUserUseCase = new CreateUserUseCase(adminRepositoryMock);

const userCreateNonAdmin: CreateUserDto = {
    firstName: "Pedro",
    lastName: "Miotti",
    email: "pedromiotti@hotmail.com",
    isAdmin: false,
    isStaff: true
}
const userCreateAdmin: CreateUserDto = {
    firstName: "Pedro",
    lastName: "Miotti",
    email: "pedromiotti@hotmail.com",
    isAdmin: true,
    isStaff: true
}
const dateNow: string = "2021-07-26T11:25:13.747-03:00";
const salt: string = "$2a$10$vQ4px79jV9R.wJvBxsA.LO";
const hashedPasswd: string = "$2a$10$g04MiYGnWqNh6O08Wp7iSuTtonAkPjrJSHeZY9DoN6BJYR7q2b4x2";
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
        adminRepositoryMock.createUser.mockReset();
    });

    it("Should return a success if the non-admin user was created", async () => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com", true, false);

        adminRepositoryMock.createUser.mockResolvedValueOnce(user);
        adminRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);

        const result = await createUserUseCase.execute(userCreateNonAdmin, nonAdminSession);

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.CREATED);
        expect(result.message).toBe(resources.get(resourceKeys.USER_CREATED_SUCCESSFULLY));
    })

    it("Should return a success if the admin user was created", async () => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com", true, true);

        adminRepositoryMock.createUser.mockResolvedValueOnce(user);
        adminRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);

        const result = await createUserUseCase.execute(userCreateAdmin, adminSession);

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.CREATED);
        expect(result.message).toBe(resources.get(resourceKeys.USER_CREATED_SUCCESSFULLY));
    })
})

describe("Negative user-admin tests", () => {

    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        adminRepositoryMock.createUser.mockReset();

    });

    it("Should return a 400 error if the user e-mail was found", async () => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com", true, false);
        adminRepositoryMock.getUserByEmail.mockResolvedValueOnce(user);

        const result = await createUserUseCase.execute(userCreateNonAdmin, adminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.EMAIL_ALREADY_IN_USE, {
                email: user.email,
            }),
        );
    })

    it("Should return a 500 error if there was an error while creating the user", async () => {
        adminRepositoryMock.getUserByEmail.mockResolvedValueOnce(null);
        adminRepositoryMock.createUser.mockResolvedValueOnce(null);

        const result = await createUserUseCase.execute(userCreateNonAdmin, adminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.INTERNAL_ERROR);
        expect(result.error).toBe(resources.get(resourceKeys.ERROR_CREATING_USER));
    })

    it("Should return a 400 error if the e-mail is missing ", async () => {
        const userMissingEmail: CreateUserDto = {
            firstName: "Pedro",
            lastName: "Miotti",
            email: null,
            isAdmin: false,
            isStaff: true
        }

        const result = await createUserUseCase.execute(userMissingEmail, adminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: `email`,
            }),
        );
    })

    it("Should return a 400 error if the first and last name are missing ", async () => {
        const userMissingEmail: CreateUserDto = {
            firstName: null,
            lastName: null,
            email: "pedromiotti@hotmail.com",
            isAdmin: false,
            isStaff: true
        }

        const result = await createUserUseCase.execute(userMissingEmail, adminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.BAD_REQUEST);
        expect(result.error).toBe(
            resources.getWithParams(resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                missingParams: `firstName, lastName`,
            }),
        );
    })

    it("Should return a 401 error if the user is not a admin and wants to create a admin user", async () => {
        const result = await createUserUseCase.execute(userCreateAdmin, nonAdminSession);

        expect(result.success).toBeFalsy();
        expect(result.statusCode).toBe(applicationStatus.UNAUTHORIZED);
        expect(result.error).toBe(resources.get(resourceKeys.CREATE_ADMIN_USER_NOT_AUTHORIZED));
    })
})
