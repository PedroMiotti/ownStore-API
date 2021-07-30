import { IEncryptionUtils } from "@/domain/shared/utilityContracts/IEncryptionUtils";
import {compareSync, genSaltSync, hashSync} from "bcryptjs";


export class EncryptionUtils implements IEncryptionUtils{
    getSalt(rounds: number): string {
        return genSaltSync(rounds);
    }

    hashPassword(passwd: string, salt: string | number): string {
        return hashSync(passwd, salt);
    }

    comparePassword(passwd: string, hash: string): boolean {
        return compareSync(passwd, hash);
    }

}

export default new EncryptionUtils();