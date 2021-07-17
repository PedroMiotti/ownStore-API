import { mock } from "jest-mock-extended";
import { CreateSessionTokenUseCase } from ".";
import { User } from "../../../../../domain/user/User";
import resources from "../../../../shared/locals";
import { IAuthProvider } from "../../ports/IAuthProvider";


const authProviderMock = mock<IAuthProvider>();
const createSessionTokenUseCase = new CreateSessionTokenUseCase(authProviderMock);

const authenticatedUser: User = new User("Pedro", "Miotti", "Pedromiotti@hotmail.com", false, false, "123");
const mockToken = "hui3h2r8793y28rh4ui3hq8r94y3q89ry34hwqiohiY*Y@#*Y$*yut8hr4eigf"

describe("Create session tokens", () => {
    beforeAll(() => {
        resources.setDefaultLanguage("pt");
    });
    beforeEach(() => {
        authProviderMock.getJwt.mockReset();
    });

    it("Should return a session token", async () => {
        authProviderMock.getJwt.mockResolvedValueOnce(mockToken);

        const token = await createSessionTokenUseCase.execute(authenticatedUser);
        expect(token.token).toBe(mockToken);
        expect(token.expireIn).toBe(365 * 24 * 60 * 60 * 1000);
    })

})