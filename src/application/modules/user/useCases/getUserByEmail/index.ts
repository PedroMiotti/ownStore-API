import { BaseUseCase, ResultT, Result, IResultT } from "../../../../shared/useCase/BaseUseCase";
import { IUserRepository } from "../../ports/IUserRepository";
import { User } from "@/domain/user/User";


export class GetUserByEmailUseCase extends BaseUseCase{
    private readonly userRepository: IUserRepository;

    public constructor(userRepository: IUserRepository){
        super();
        this.userRepository = userRepository;
    }

    async execute(email: string): Promise<IResultT<User>>{
        const result = new ResultT<User>();

        if(!this.isValidRequest(result,  email)){
            return result;
        }

        const existingUser = await this.userRepository.getUserByEmail(email);
        if(!existingUser){
            result.setError(
                this.resources.get(this.resourceKeys.USER_DOESNT_EXISTS),
                this.applicationStatusCode.BAD_REQUEST,
            );
            return result;
        }

        result.setData(existingUser, this.applicationStatusCode.SUCCESS);
        result.setMessage(
            this.resources.get(this.resourceKeys.CUSTOMER_FOUND_SUCCESSFULLY), // TODO -> Change to user_found_...
            this.applicationStatusCode.SUCCESS,
        );

        return result;
 
    }


    private isValidRequest(result: Result, email: string): boolean {
        const validations = {};
        validations["email"] = email;

        return this.validator.isValidEntry(result, validations);
    }
}