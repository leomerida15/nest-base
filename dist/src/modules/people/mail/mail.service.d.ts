import { ConfigService } from "@nestjs/config";
import { AddUserProps, sendRecoverProps } from "../dtos/Mail.dto";
export declare class MailService {
    private readonly configService;
    constructor(configService: ConfigService);
    addUser({ email, firsName: FNAME, lastName: LNAME }: AddUserProps): Promise<void>;
    sendRecover({ to, token }: sendRecoverProps): Promise<void>;
}
