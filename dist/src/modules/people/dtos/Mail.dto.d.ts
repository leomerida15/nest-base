import { SendSmtpEmailTo } from "sib-api-v3-typescript";
export declare class AddUserProps {
    email: string;
    firsName: string;
    lastName: string;
}
export declare class sendRecoverProps {
    to: SendSmtpEmailTo[];
    token: string;
}
