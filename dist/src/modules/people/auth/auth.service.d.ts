import { Repository } from "typeorm";
import { UsersJwtDTO, UsersLoginDTO, UsersRecoverDTO, UsersRegisterDTO } from "../dtos/Users.dto";
import { UsersDB } from "../entitys/Users.db";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthService {
    private readonly getUsers;
    private readonly jwtService;
    private readonly configService;
    constructor(getUsers: Repository<UsersDB>, jwtService: JwtService, configService: ConfigService);
    createUser(user: UsersRegisterDTO): Promise<{
        info: UsersRegisterDTO & UsersDB;
        accesstoken: string;
    }>;
    validUserAuth(user: UsersLoginDTO): Promise<{
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
    validUserRecover(user: UsersRecoverDTO): Promise<{
        info: UsersDB;
        accesstoken: string;
    }>;
    allUsers(): Promise<UsersDB[]>;
    recoverUsers({ email }: UsersJwtDTO): Promise<UsersDB>;
}
