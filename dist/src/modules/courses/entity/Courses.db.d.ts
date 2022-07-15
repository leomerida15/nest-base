import { UsersDB } from "../../people/entitys/Users.db";
import { BaseDB } from "../../../utils/Base.db";
export declare class CoursesDB extends BaseDB {
    title: string;
    studens?: UsersDB[];
}
