"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwtConfig = () => ({
    key: process.env.JWT_KEY,
    options: { expiresIn: process.env.JWT_EXP },
});
exports.default = jwtConfig;
//# sourceMappingURL=jwt.js.map