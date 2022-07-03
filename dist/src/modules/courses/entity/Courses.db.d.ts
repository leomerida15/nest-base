import { UsersDB } from "src/modules/people/entity/Users.db";
import { BaseDB } from "src/utils/Base.db";
export declare class CoursesDB extends BaseDB {
    title: string;
    studens?: UsersDB[];
}
