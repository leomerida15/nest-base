"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mailConfig = () => ({
    key: process.env.MAIL_KEY,
    sender: {
        name: process.env.MAIL_SENDER_NAME,
        email: process.env.MAIL_SENDER_EMAIL,
    },
});
exports.default = mailConfig;
//# sourceMappingURL=mail.js.map