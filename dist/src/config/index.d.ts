declare const _default: () => {
    db: import("@nestjs/typeorm").TypeOrmModuleOptions;
    jwt: import("./types").JwtConfig<import("jsonwebtoken").Secret>;
    mail: {
        key: string;
        sender: {
            name: string;
            email: string;
        };
        jwtRecover: {
            secret: string;
            expiresIn: string;
        };
    };
};
export default _default;
