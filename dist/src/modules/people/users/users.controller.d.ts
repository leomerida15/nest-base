import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    allUser(): Promise<{
        msg: string;
        info: import("../entitys/Users.db").UsersDB[];
    }>;
}
