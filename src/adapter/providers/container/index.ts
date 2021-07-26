import { AuthProvider } from "../auth/AuthProvider";
import {DateProvider} from "@/adapter/providers/shared/ports/DateProvider";
import {EncryptionProvider} from "@/adapter/providers/shared/ports/EncryptionProvider";

const authProvider = new AuthProvider();
const dateProvider = new DateProvider();
const encryptionProvider = new EncryptionProvider();

export { authProvider, dateProvider, encryptionProvider };