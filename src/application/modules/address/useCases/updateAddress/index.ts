import { BaseUseCase, IResultT, ResultT } from "../../../../shared/useCase/BaseUseCase";
import { IAddressRepository } from "../../ports/IAddressRepository";
import { Address } from "../../../../../domain/address/Address";

export class UpdateAddressUseCase extends BaseUseCase {
    private readonly addressRepository: IAddressRepository;

    public constructor(addressRepository: IAddressRepository) {
        super();
        this.addressRepository = addressRepository;
    }

    async execute(address: Address): Promise<IResultT<Address>>{
        const result = new ResultT<Address>();

        // * Database table is set to cascade on delete so no need to check if the customer exists.

        const doesAddressExists: Address = await this.addressRepository.getAddressById(address.id);
        if (!doesAddressExists) {
            result.setError(
                this.resources.get(this.resourceKeys.ADDRESS_NOT_FOUND),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        const wasUpdated: Address = await this.addressRepository.updateAddress(address);
        if (!wasUpdated) {
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_UPDATING_ADDRESS),
                this.applicationStatusCode.INTERNAL_ERROR
            );
            return result;
        }

        result.setData(wasUpdated, this.applicationStatusCode.SUCCESS);

        result.setMessage(
            this.resources.get(this.resourceKeys.ADDRESS_OPERATION_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;
    }

}