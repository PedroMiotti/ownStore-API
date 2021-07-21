import {User} from "../../../../../domain/user/User";
import {TokenDto} from "../../dto/TokenDto";
import {ISession} from "../../../../../domain/session/ISession";
import {BaseUseCase} from "../../../../shared/useCase/BaseUseCase";
import {IAuthProvider} from "../../ports/IAuthProvider";


export class CreateSessionTokenUseCase extends BaseUseCase{
    private readonly authProvider: IAuthProvider;

    public constructor(authProvider: IAuthProvider) {
        super();
        this.authProvider = authProvider;
    }

    async execute(authenticatedUser: User): Promise<TokenDto> {
        const session: ISession = authenticatedUser.createSession();
        const token = await this.authProvider.getJwt(session);

        const tokenDto: TokenDto = new TokenDto(token, 365 * 24 * 60 * 60 * 1000); // TODO -> Swap with appsettings JWTExpirationTime
        return Promise.resolve(tokenDto);
    }
}