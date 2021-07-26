import {BaseProvider} from "@/adapter/providers/base/BaseProvider";
import {IEncryptionProvider} from "@/application/shared/ports/IEncryptionProvider";

export class EncryptionProvider extends BaseProvider implements IEncryptionProvider{
    getSalt(rounds: number): string {
        return "";
    }

    hashPassword(passwd: string, salt: string | number): string {
        return "";
    }

}