import { ConfigService } from "@nestjs/config";
import { AddUserProps } from "../dtos/Mail.dto";
export declare class MailService {
    private readonly configService;
    private processTo;
    constructor(configService: ConfigService);
    addUser({ email }: AddUserProps): Promise<void>;
    sendRecover(): Promise<void>;
}
