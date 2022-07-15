import { UsersLoginDTO, UsersRecoverDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { MailService } from "../mail/mail.service";
import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    private readonly mailService;
    constructor(authService: AuthService, mailService: MailService);
    registerUser(user: UsersRegisterDTO): Promise<{
        msg: string;
        info: UsersRegisterDTO & import("../entitys/Users.db").UsersDB;
        accesstoken: string;
    }>;
    loginUser(user: UsersLoginDTO): Promise<{
        msg: string;
        info: {
            email: string;
            firsName: string;
            lastName: string;
            rol: number | import("../entitys/Rols.db").RolsDB;
            courses?: import("../../courses/entity/Courses.db").CoursesDB[];
            id?: string;
            createdDate?: Date;
            updatedDate?: Date;
        };
        accesstoken: string;
    }>;
    recoverUser(user: UsersRecoverDTO): Promise<{
        msg: string;
    }>;
}
