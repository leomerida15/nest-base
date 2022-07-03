import { BaseDB } from "src/utils/Base.db";
import { RolsDB } from "./Rols.db";
export declare class PermissionsDB extends BaseDB {
    name: string;
    rols?: RolsDB[];
}
