import { BaseDB } from "../../../utils/Base.db";
import { RolsDB } from "./Rols.db";
import { CoursesDB } from "src/modules/courses/entity/Courses.db";
export declare class UsersDB extends BaseDB {
    email: string;
    firsName: string;
    lastName: string;
    password: string;
    rol: RolsDB | number;
    courses?: CoursesDB[];
}
