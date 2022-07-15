/** @format */

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import SibApiV3Sdk, {
	SendSmtpEmailTo,
	ContactsApi,
	CreateContact,
	SendSmtpEmail,
} from "sib-api-v3-typescript";
import { AddUserProps, sendRecoverProps } from "../dtos/Mail.dto";

@Injectable()
export class MailService {
	constructor(private readonly configService: ConfigService) {}

	public async addUser({ email, firsName: FNAME, lastName: LNAME }: AddUserProps) {
		let apiInstance = new ContactsApi();

		// @ts-ignore
		let apiKey = apiInstance.authentications["apiKey"];

		apiKey.apiKey = this.configService.get("mail").key;

		const createContact = new CreateContact();

		createContact.email = email;
		createContact.listIds = [2];
		createContact.attributes = { FNAME, LNAME };

		await apiInstance.createContact(createContact);
	}

	async sendRecover({ to, token }: sendRecoverProps) {
		let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

		// @ts-ignore
		let apiKey = apiInstance.authentications["apiKey"];

		apiKey.apiKey = this.configService.get("mail").key;

		const sendSmtpEmail = new SendSmtpEmail();

		sendSmtpEmail.to = to as SendSmtpEmailTo[];
		sendSmtpEmail.params = { token };
		sendSmtpEmail.templateId = 3;

		await apiInstance.sendTransacEmail(sendSmtpEmail);
	}
}
