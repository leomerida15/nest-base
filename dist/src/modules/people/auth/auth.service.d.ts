import { Repository } from "typeorm";
import { UsersLoginDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { UsersDB } from "../entity/Users.db";
import { JwtService } from "@nestjs/jwt";
export declare class AuthService {
    private readonly getUsers;
    private readonly jwtService;
    constructor(getUsers: Repository<UsersDB>, jwtService: JwtService);
    createUser(user: UsersRegisterDTO): Promise<{
        info: UsersRegisterDTO & UsersDB;
        accesstoken: string;
    }>;
    validUser(user: UsersLoginDTO): Promise<{
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
    allUsers(): Promise<UsersDB[]>;
}
