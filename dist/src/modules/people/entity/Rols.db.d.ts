import { BaseDB } from "src/utils/Base.db";
import { PermissionsDB } from "./Permissions.db";
import { UsersDB } from "./Users.db";
export declare class RolsDB extends BaseDB {
    name: string;
    permissions?: PermissionsDB[];
    Users: UsersDB[];
}
