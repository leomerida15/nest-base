declare const _default: () => {
    db: import("@nestjs/typeorm").TypeOrmModuleOptions;
    jwt: import("./types").JwtConfig<import("jsonwebtoken").Secret>;
    mail: {
        key: string;
        sender: {
            name: string;
            email: string;
        };
    };
};
export default _default;
