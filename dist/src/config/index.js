"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const jwt_1 = require("./jwt");
const mail_1 = require("./mail");
exports.default = () => ({
    db: (0, db_1.default)(),
    jwt: (0, jwt_1.default)(),
    mail: (0, mail_1.default)(),
});
//# sourceMappingURL=index.js.map