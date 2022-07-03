declare const _default: () => {
    db: import("@nestjs/typeorm").TypeOrmModuleOptions;
    jwt: {
        key: import("jsonwebtoken").Secret;
        options: import("jsonwebtoken").SignOptions;
    };
};
export default _default;
