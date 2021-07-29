import {BaseUseCase, Result, IResultT, ResultT} from "../../../../shared/useCase/BaseUseCase";
import {UserLoginDto} from "../../dto/UserLoginDto";
import {TokenDto} from "../../dto/TokenDto";
import {User} from "@/domain/user/User";
import {IAuthProvider} from "../../ports/IAuthProvider";
import {CreateSessionTokenUseCase} from "../createSessionToken";

export class LoginUseCase extends BaseUseCase {
    private readonly authProvider: IAuthProvider;

    public constructor(authProvider: IAuthProvider) {
        super();
        this.authProvider = authProvider;
    }

    async execute(user: UserLoginDto): Promise<IResultT<TokenDto>> {
        const result = new ResultT<TokenDto>();

        if (!this.isValidRequest(result, user)) {
            return result;
        }

        const authenticatedUser: User | void = await this.authProvider.login(user).catch((e) => {
            result.setError(
                this.resources.get(this.resourceKeys.SOMETHING_WENT_WRONG),
                this.applicationStatusCode.INTERNAL_ERROR,
            );

            this.handleResultError(result);
        });

        if (!authenticatedUser) {
            result.setError(
                this.resources.get(this.resourceKeys.INVALID_EMAIL_OR_PASSWORD),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return result;
        }

        const session = new CreateSessionTokenUseCase(this.authProvider);
        const token: TokenDto = await session.execute(authenticatedUser);

        result.setData(token, this.applicationStatusCode.SUCCESS);
        result.setMessage(
            this.resources.get(this.resourceKeys.USER_LOGGED_IN_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;
    }

    private isValidRequest(result: Result, userLogin: UserLoginDto): boolean {
        const validations = {};
        validations["email"] = userLogin.email;
        validations["password"] = userLogin.password as string;

        return this.validator.isValidEntry(result, validations);
    }
}