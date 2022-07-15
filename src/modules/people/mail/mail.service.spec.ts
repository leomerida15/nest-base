/** @format */

import { ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import { MailService } from "./mail.service";

describe("MailService", () => {
	let mailService: MailService;
	let configService: ConfigService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				MailService,
				{
					provide: ConfigService,
					useValue: {
						get: (data: string) => {
							if (data === "mail") {
								return {
									key: "",
									sender: {
										name: "",
										email: "",
									},
									jwtRecover: {
										secret: "",
										expiresIn: "",
									},
								};
							}

							return null;
						},
					},
				},
			],
		}).compile();

		mailService = module.get<MailService>(MailService);
	});

	it("should be defined", () => {
		expect(mailService).toBeDefined();
	});

	describe("test addUser", () => {
		it("addUser ok", async () => {});
	});
});
