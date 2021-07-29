import { IEncryptionUtils } from "@/domain/shared/utilityContracts/IEncryptionUtils";
import { genSaltSync, hashSync } from "bcryptjs";


export class EncryptionUtils implements IEncryptionUtils{
    getSalt(rounds: number): string {
        return genSaltSync(rounds);
    }

    hashPassword(passwd: string, salt: string | number): string {
        return hashSync(passwd, salt);
    }
}

export default new EncryptionUtils();