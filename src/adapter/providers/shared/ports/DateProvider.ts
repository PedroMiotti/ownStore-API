import {BaseProvider} from "@/adapter/providers/base/BaseProvider";
import {IDateProvider} from "@/application/shared/ports/IDateProvider";

export class DateProvider extends BaseProvider implements IDateProvider{
    getDateNow(): string {
        return "";
    }

}