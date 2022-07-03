"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dbConfig = () => ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATA,
    type: process.env.DB_TYPE,
    synchronize: process.env.NODE_ENV === "dev",
    entities: [],
    cli: {
        entitiesDir: (0, path_1.join)((0, path_1.resolve)(), "src/modules"),
    },
});
exports.default = dbConfig;
//# sourceMappingURL=db.js.map