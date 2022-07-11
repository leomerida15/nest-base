/** @format */

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { isArray } from "class-validator";

import SibApiV3Sdk, {
	SendSmtpEmailTo,
	ContactsApi,
	CreateContact,
	SendSmtpEmail,
} from "sib-api-v3-typescript";
import { AddUserProps, sendRecoverProps } from "../dtos/Mail.dto";

// Configure API key authorization: apiKey

// apiInstance.getAccount().then(
// 	function (data) {
// 		console.log("API called successfully. Returned data: ", data.body);
// 	},
// 	function (error) {
// 		console.error(error);
// 	},
// );

interface serdProps {
	//
	to: Array<SendSmtpEmailTo> | SendSmtpEmailTo;
	//
	params: object & { [ket: string]: any };
}

@Injectable()
export class MailService {
	constructor(private readonly configService: ConfigService) {}

	public async addUser({ email, firsName: FNAME, lastName: LNAME }: AddUserProps) {
		let apiInstance = new ContactsApi();

		// @ts-ignore
		let apiKey = apiInstance.authentications["apiKey"];

		apiKey.apiKey = this.configService.get("mail").key;

		let createContact = new CreateContact();

		createContact.email = email;
		createContact.listIds = [2];
		createContact.attributes = { FNAME, LNAME };

		await apiInstance.createContact(createContact);
	}

	async sendRecover({ to }: sendRecoverProps) {
		let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

		// @ts-ignore
		let apiKey = apiInstance.authentications["apiKey"];

		apiKey.apiKey = this.configService.get("mail").key;

		let sendSmtpEmail = new SendSmtpEmail();

		sendSmtpEmail.to = to;
		sendSmtpEmail.templateId = 3;

		await apiInstance.sendTransacEmail(sendSmtpEmail);
	}
}
