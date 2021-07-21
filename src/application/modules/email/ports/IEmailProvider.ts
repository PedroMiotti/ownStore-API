import { EmailOptionsDto } from "../dto/EmailOptionsDto";
export interface IEmailProvider{
    send(options: EmailOptionsDto): Promise<EmailOptionsDto>;
}