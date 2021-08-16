import BaseController, {NextFunction, Request, Response} from "@/adapter/controllers/base/BaseController";
import { CreateUserDto } from "@/application/modules/administrator/dto/CreateUserDto";
import { registerCustomerUseCase } from './container/index'

export class CustomerController extends BaseController {
    constructor() {
        super();
        this.initializeRoutes();
    }

    register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const user: CreateUserDto = {
                firstName: req.body?.firstName,
                lastName: req.body?.lastName,
                email: req.body?.email,
                isStaff: req.body?.isStaff,
                isAdmin: req.body?.isAdmin,
                password: req.body?.password
            };

            this.handleResult(res, await registerCustomerUseCase.execute(user));

        } catch (error) {
            next(error);
        }
    };

    private initializeRoutes(): void {

        this.router.post('/v1/customer/register', this.register);

    }

}

export default new CustomerController();