import { Repository } from "typeorm";
import { UsersDB } from "../entitys/Users.db";
export declare class UsersService {
    private readonly getUsers;
    constructor(getUsers: Repository<UsersDB>);
    allUsers(): Promise<UsersDB[]>;
}
