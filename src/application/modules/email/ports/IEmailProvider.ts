import { EmailOptionsDto } from "../dto/emailOptionsDto";

export interface IEmailProvider{
    send(options: EmailOptionsDto): Promise<EmailOptionsDto>;
}