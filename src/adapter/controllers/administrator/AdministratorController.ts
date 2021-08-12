import BaseController, {Request, Response, NextFunction} from "../base/BaseController";
import {createUserUseCase} from "@/adapter/controllers/administrator/container";
import {CreateUserDto} from "@/application/modules/administrator/dto/CreateUserDto";

export class AdministratorController extends BaseController {

    constructor() {
        super();
        this.initializeRoutes();
    }

    create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user: CreateUserDto = {
                firstName: req.body?.firstName,
                lastName: req.body?.lastName,
                email: req.body?.email,
                isStaff: req.body?.isStaff,
                isAdmin: req.body?.isAdmin
            };

            this.handleResult(res, await createUserUseCase.execute(user, req.session));

        } catch (error) {
            next(error);
        }
    };

    private initializeRoutes(): void {

        this.router.post("/v1/admin/", this.create);

    }
}

export default new AdministratorController();
