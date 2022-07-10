import { UsersLoginDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerUser(user: UsersRegisterDTO): Promise<{
        msg: string;
        info: UsersRegisterDTO & import("../entity/Users.db").UsersDB;
        accesstoken: string;
    }>;
    loginUser(user: UsersLoginDTO): Promise<{
        msg: string;
        info: {
            email: string;
            firsName: string;
            lastName: string;
            rol: number | import("../entity/Rols.db").RolsDB;
            courses?: import("../../courses/entity/Courses.db").CoursesDB[];
            id?: string;
            createdDate?: Date;
            updatedDate?: Date;
        };
        accesstoken: string;
    }>;
    allUser(): Promise<{
        msg: string;
        info: import("../entity/Users.db").UsersDB[];
    }>;
}
