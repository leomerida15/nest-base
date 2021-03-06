/** @format */

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ContactsApi,
  CreateContact,
  SendSmtpEmail,
  TransactionalEmailsApi,
} from 'sib-api-v3-typescript';

interface Instance {
  setApiKey: (apiKey: number, key: string) => void;
}

@Injectable()
export class MailService {
  private ApiInstance<C>(onInstance: new () => Instance & C): C {
    const resp = new onInstance();
    resp.setApiKey(0, this.configService.get('mail').key);

    return resp;
  }

  private defineBody<C>(onInstance: new () => C, data: C): C {
    const initClass = new onInstance();

    Object.entries(data).forEach(([key, value]) => {
      initClass[key] = value;
    });

    return initClass;
  }

  constructor(private readonly configService: ConfigService) {}

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
        recoverUrl: this.configService.get('mail').recoverUrl(token),
      },
      templateId: this.configService.get('mail').templateId,
    };

    const sendSmtpEmail = this.defineBody<SendSmtpEmail>(SendSmtpEmail, data);

    await apiInstance.sendTransacEmail(sendSmtpEmail);
  }
}
