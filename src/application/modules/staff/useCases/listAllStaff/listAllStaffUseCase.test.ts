import resources, {resourceKeys} from "../../../../shared/locals";
import { User } from "../../../../../domain/user/User";
import applicationStatus from "../../../../shared/status/applicationStatusCodes";
import { mock } from "jest-mock-extended";
import { ListAllStaffUseCase } from "./index";
import {IStaffRepository} from "../../ports/IStaffRepository";

const staffRepositoryMock = mock<IStaffRepository>();
const listAllUsersUseCases = new ListAllStaffUseCase(staffRepositoryMock);

describe("Positive user-admin tests", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });

    beforeEach(() => {
        staffRepositoryMock.getAllStaff.mockReset();
    });

    it("Should return a success all users were returned", async () => {
        const user: User = new User("Pedro", "Miotti", "pedromiotti@hotmail.com",true, true );
        const user2: User = new User("Thiago", "Miotti", "thiagomiotti@hotmail.com",true, false );

        staffRepositoryMock.getAllStaff.mockResolvedValueOnce([user, user2]);

        const result = await listAllUsersUseCases.execute();

        expect(result.success).toBeTruthy();
        expect(result.statusCode).toBe(applicationStatus.SUCCESS);
        expect(result.message).toBe(resources.get(resourceKeys.USERS_RETRIEVED_SUCCESSFULLY));
    })

})