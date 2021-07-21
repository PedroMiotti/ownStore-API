import { UserLoginDto } from "../../../application/modules/auth/dto/UserLoginDto";
import BaseController, { Request, Response, NextFunction } from "../base/BaseController";
import { loginUseCase } from "./container";

export class AuthController extends BaseController {

  constructor() {
    super();
    this.initializeRoutes();
  }

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const email = req.body?.email as string;
      const password = req.body.password as string;
      const user: UserLoginDto = { email, password};

      this.handleResult(res, await loginUseCase.execute(user));

    } catch (error) {

      next(error);

    }
  };

  private initializeRoutes(): void {

    this.router.post("/v1/users/login", this.login);

  }
}

export default new AuthController();
