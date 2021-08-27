import BaseController, { NextFunction, Request, Response } from "@/adapter/controllers/base/BaseController";
import { Address } from "@/domain/address/Address";
import { AddAddressDto } from "@/application/modules/address/dto/AddAddressDto";
import { addAddressUseCase } from "@/adapter/controllers/address/container";
import mapper from "mapper-tsk";

export class AddressController extends BaseController {
    constructor() {
        super();
        this.initializeRoutes();
    }

    add = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try{
            const customerId: number = parseInt(req.body?.customerId);
            const address: AddAddressDto = {
                streetName: req.body?.streetName,
                postalCode: req.body?.postalCode,
                number: req.body?.number,
                neighborhood: req.body?.neighborhood,
                city: req.body?.city,
                state: req.body?.state,
                country: req.body?.country,
                complement: req.body?.complement,
            }

            const mappedAddress = mapper.mapObject(address, new Address());

            this.handleResult(res, await addAddressUseCase.execute(customerId, mappedAddress));

        }
        catch (e) {
            next(e);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction):Promise<void> => {

    }

    delete = async (req: Request, res: Response, next: NextFunction):Promise<void> => {

    }

    getById = async (req: Request, res: Response, next: NextFunction):Promise<void> => {

    }

    private initializeRoutes(): void {
        this.router.post('/v1/address/', this.add);
        this.router.put('/v1/address/', this.update);
        this.router.delete('/v1/address/:id', this.delete);
        this.router.get('/v1/address/:id', this.getById);
    }
}

export default new AddressController();