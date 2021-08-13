import BaseController, {Request, Response, NextFunction} from "../base/BaseController";
import {createUserUseCase, deleteUserUseCase, updateUserUseCase} from "@/adapter/controllers/administrator/container";
import { CreateUserDto } from "@/application/modules/administrator/dto/CreateUserDto";
import {UpdateUserDto} from "@/application/modules/administrator/dto/UpdateUserDto";

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

    delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const id: number = parseInt(req.params?.id);
            this.handleResult(res, await deleteUserUseCase.execute(id, req.session));

        } catch (error) {
            next(error);
        }
    };

    update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user: UpdateUserDto = {
                id: parseInt(req.params?.id),
                firstName: req.body?.firstName,
                lastName: req.body?.lastName,
                email: req.body?.email,
                isStaff: req.body?.isStaff,
                isAdmin: req.body?.isAdmin
            };

            this.handleResult(res, await updateUserUseCase.execute(user, req.session));

        } catch (error) {
            next(error);
        }
    };

    private initializeRoutes(): void {

        this.router.post("/v1/admin/", this.create);
        this.router.delete("/v1/admin/:id", this.delete);
        this.router.put("/v1/admin/:id", this.update);

    }
}

export default new AdministratorController();
