import { BaseDTO } from "../../../utils/dto/Base.dto";
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
export declare class UsersJwtDTO extends BaseDTO {
    email: string;
}
export declare class UsersRecoverDTO {
    email: string;
}
