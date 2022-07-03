import { BaseDTO } from "src/utils/Base.dto";
import { RolsDB } from "../table/Rols.db";
export declare class UsersDTO extends BaseDTO {
    email: string;
    firsName: string;
    lastName: string;
    rol?: RolsDB | number;
}
