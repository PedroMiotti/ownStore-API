import { LoginUseCase } from "@/application/modules/auth/useCases/login";
import { authProvider } from "@/adapter/providers/container";

const loginUseCase = new LoginUseCase(authProvider);

export { loginUseCase };
