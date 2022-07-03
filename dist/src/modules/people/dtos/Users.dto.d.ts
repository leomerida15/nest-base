import { BaseDTO } from "src/utils/Base.dto";
export declare class UsersRegisterDTO extends BaseDTO {
    email: string;
    firsName: string;
    lastName: string;
    password: string;
}
export declare class UsersLoginDTO extends BaseDTO {
    email: string;
    password: string;
}
