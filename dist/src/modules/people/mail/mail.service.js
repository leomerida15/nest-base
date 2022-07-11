"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sib_api_v3_typescript_1 = require("sib-api-v3-typescript");
let MailService = class MailService {
    constructor(configService) {
        this.configService = configService;
    }
    processTo(to) {
        if (Array.isArray(to))
            return to;
        return [to];
    }
    async addUser({ email }) {
        let apiInstance = new sib_api_v3_typescript_1.ContactsApi();
        let apiKey = apiInstance.authentications["apiKey"];
        apiKey.apiKey = this.configService.get("mail").key;
        let createContact = new sib_api_v3_typescript_1.CreateContact();
        createContact.email = email;
        createContact.listIds = [2];
        createContact.attributes = [2];
        await apiInstance.createContact(createContact);
    }
    async sendRecover() {
        let apiInstance = new sib_api_v3_typescript_1.default.TransactionalEmailsApi();
        let apiKey = apiInstance.authentications["apiKey"];
        apiKey.apiKey = this.configService.get("mail").key;
        let sendSmtpEmail = new sib_api_v3_typescript_1.SendSmtpEmail();
        sendSmtpEmail.subject = "My {{params.subject}}";
        sendSmtpEmail.sender = { name: "John Doe", email: "example@example.com" };
        sendSmtpEmail.to = [{ email: "example@example.com", name: "Jane Doe" }];
        sendSmtpEmail.templateId = 3;
        await apiInstance.sendTransacEmail(sendSmtpEmail);
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map