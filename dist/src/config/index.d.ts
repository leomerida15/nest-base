declare const _default: () => {
    db: import("@nestjs/typeorm").TypeOrmModuleOptions;
    jwt: import("./types").JwtConfig<import("jsonwebtoken").Secret>;
};
export default _default;
