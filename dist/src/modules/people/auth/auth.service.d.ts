import { Repository } from "typeorm";
import { UsersLoginDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { UsersDB } from "../entity/Users.db";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private getUsers;
    private configService;
    constructor(getUsers: Repository<UsersDB>, configService: ConfigService);
    createJWT(payload: any): void;
    registerUser(user: UsersRegisterDTO): Promise<UsersRegisterDTO & UsersDB>;
    loginUser(user: UsersLoginDTO): Promise<{
        email: string;
        firsName: string;
        lastName: string;
        rol: number | import("../entity/Rols.db").RolsDB;
        courses?: import("../../courses/entity/Courses.db").CoursesDB[];
        id?: string;
        createdDate?: Date;
        updatedDate?: Date;
    }>;
}
