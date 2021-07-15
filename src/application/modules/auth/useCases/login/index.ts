import {BaseUseCase, Result, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { UserLoginDto } from "../../dto/UserLoginDto";
import { TokenDto } from "../../dto/TokenDto";
import { User } from "../../../../../domain/user/User";
import { IAuthProvider } from "../../ports/IAuthProvider";
import { ISession } from "../../../../../domain/Session/ISession";

export class LoginUseCase extends BaseUseCase{
    private readonly authProvider: IAuthProvider;

    public constructor(authProvider: IAuthProvider) {
        super();
        this.authProvider = authProvider;
    }

    async execute(user: UserLoginDto): Promise<IResultT<TokenDto>> {
        const result = new ResultT<TokenDto>();

        if(!this.isValidRequest(result, user)){
            return result;
        }

        const authenticatedUser: User = await this.authProvider.login(user).catch(() => {
            result.setError(
                this.resources.get(this.resourceKeys.INVALID_EMAIL_OR_PASSWORD),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return null;
        });

        if (!authenticatedUser) {
            return result;
        }

        const tokenDto: TokenDto = await this.createSession(authenticatedUser);

        result.setData(tokenDto, this.applicationStatusCode.SUCCESS);
        result.setMessage(
            this.resources.get(this.resourceKeys.USER_LOGGED_IN_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;
    }

    private async createSession(authenticatedUser: User): Promise<TokenDto> {
        const session: ISession = authenticatedUser.createSession();
        const token = await this.authProvider.getJwt(session);

        const tokenDto: TokenDto = new TokenDto(token, 365 * 24 * 60 * 60 * 1000); // TODO -> Swap with appsettings JWTExpirationTime
        return Promise.resolve(tokenDto);
    }

    private isValidRequest(result: Result, userLogin: UserLoginDto): boolean {
        const validations = {};
        validations["email"] = userLogin.email;
        validations["password"] = userLogin.password as string;

        return this.validator.isValidEntry(result, validations);
    }
}