import { BaseUseCase, IResult, Result } from "../../../../shared/useCase/BaseUseCase";
import { IAddressRepository } from "../../../../modules/address/ports/IAddressRepository";
import { ISession } from "../../../../../domain/session/ISession";
import { Address } from "../../../../../domain/address/Address";
import { IUserRepository } from "@/application/modules/user/ports/IUserRepository";

export class DeleteAddressUseCase extends BaseUseCase {
    private readonly addressRepository: IAddressRepository;
    private readonly userRepository: IUserRepository;

    public constructor(addressRepository: IAddressRepository, userRepository: IUserRepository) {
        super();
        this.addressRepository = addressRepository;
        this.userRepository = userRepository;
    }

    async execute(addressId: number, session: ISession): Promise<IResult>{
        const result = new Result();

        if(!addressId){
            result.setError(
                this.resources.getWithParams(this.resourceKeys.SOME_PARAMETERS_ARE_MISSING, {
                    missingParams: "id",
                }),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return result;
        }

        const doesAddressExists: Address = await this.addressRepository.getAddressById(addressId);
        if (!doesAddressExists) {
            result.setError(
                this.resources.get(this.resourceKeys.ADDRESS_NOT_FOUND),
                this.applicationStatusCode.BAD_REQUEST
            );
            return result;
        }

        if(session.id !== doesAddressExists.customer.id){
            result.setError(
                this.resources.get(this.resourceKeys.ADDRESS_OPERATION_NOT_AUTHORIZED),
                this.applicationStatusCode.UNAUTHORIZED
            );
            return result;
        }

        const deletedAddress = await this.addressRepository.deleteAddress(addressId);
        if(!deletedAddress){
            result.setError(
                this.resources.get(this.resourceKeys.ERROR_DELETING_ADDRESS),
                this.applicationStatusCode.INTERNAL_ERROR
            );
            return result;
        }

        result.setMessage(
            this.resources.get(this.resourceKeys.ADDRESS_OPERATION_SUCCESSFULLY),
            this.applicationStatusCode.SUCCESS,
        );

        return result;
    }

}