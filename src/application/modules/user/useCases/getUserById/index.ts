import { BaseUseCase, ResultT, Result, IResultT } from "../../../../shared/useCase/BaseUseCase";
import { IUserRepository } from "../../ports/IUserRepository";
import { User } from "@/domain/user/User";


export class GetUserByIdUseCase extends BaseUseCase{
    private readonly userRepository: IUserRepository;

    public constructor(userRepository: IUserRepository){
        super();
        this.userRepository = userRepository;
    }


    async execute(id: number): Promise<IResultT<User>>{
        const result = new ResultT<User>();

        if(!this.isValidRequest(result,  id)){
            return result;
        }

        const existingUser = await this.userRepository.getUserById(id);
        if(!existingUser){
            result.setError(
                this.resources.get(this.resourceKeys.USER_DOESNT_EXISTS),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return result;
        }

        result.setData(existingUser, this.applicationStatusCode.SUCCESS);
        result.setMessage(
            this.resources.get(this.resourceKeys.CUSTOMER_FOUND_SUCCESSFULLY), // TODO -> Change this to user_found_...
            this.applicationStatusCode.SUCCESS,
        );

        return result;
 
    }


    private isValidRequest(result: Result, id: number): boolean {
        const validations = {};
        validations["id"] = id;

        return this.validator.isValidEntry(result, validations);
    }
}