/** @format */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SibApiV3Sdk, {
  SendSmtpEmailTo,
  ContactsApi,
  CreateContact,
  SendSmtpEmail,
  TransactionalEmailsApi,
} from 'sib-api-v3-typescript';

interface Instance {
  setApiKey: (apiKey: number, key: string) => void;
}

export class MailService {
  private ApiInstance<C>(onInstance: new () => Instance & C): C {
    const resp = new onInstance();
    resp.setApiKey(
      0,
      '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',
    );

    return resp;
  }

  private defineBody<C>(onInstance: new () => C, data: C): C {
    const initClass = new onInstance();

    Object.entries(data).forEach(([key, value]) => {
      initClass[key] = value;
    });

    return initClass;
  }

  // constructor() {}

  public async addUser({ email, firsName: NOMBRE, lastName: APELLIDOS }) {
    const apiInstance = this.ApiInstance<ContactsApi>(ContactsApi);

    const data = { email, listIds: [2], attributes: { NOMBRE, APELLIDOS } };

    const createContact = this.defineBody<CreateContact>(CreateContact, data);

    await apiInstance.createContact(createContact);
  }

  public async sendRecover({ to, token }) {
    const apiInstance = this.ApiInstance<TransactionalEmailsApi>(
      TransactionalEmailsApi,
    );

    const data = {
      to,
      params: {
        url: `http://localhost:5000/auth/recover/${token}`,
      },
      templateId: 3,
    };

    const sendSmtpEmail = this.defineBody<SendSmtpEmail>(SendSmtpEmail, data);

    await apiInstance.sendTransacEmail(sendSmtpEmail);
  }
}

const mailService = new MailService();

mailService.sendRecover({
  to: [{ email: 'leomerida15@gmail.com', name: 'test' }],
  token: 'token',
});
