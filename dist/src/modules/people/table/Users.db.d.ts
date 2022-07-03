import { BaseDB } from "../../../utils/Base.db";
import { RolsDB } from "./Rols.db";
export declare class UsersDB extends BaseDB {
    email: string;
    firsName: string;
    lastName: string;
    password: string;
    rol: RolsDB | number;
}
