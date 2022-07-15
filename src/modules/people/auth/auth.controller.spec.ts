/** @format */

import { Test, TestingModule } from "@nestjs/testing";
import { UsersRegisterDTO } from "../dtos/Users.dto";
import { MailService } from "../mail/mail.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

interface data {
	ok: { register: any; login: any };
	error: { register: any; login: any };
}

describe("AuthController", () => {
	let authController: AuthController;
	let authService: AuthService;
	let mailService: MailService;

	const data: data = {
		ok: {
			register: {
				firsName: "test",
				lastName: "test",
				email: "test@test.com",
				password: "Test123.",
			},
			login: {
				email: "test@test.com",
				password: "Test123.",
			},
		},
		error: {
			register: {
				firsName: 1,
				lastName: 2,
				email: "test",
				password: "Test123",
			},
			login: {
				email: "test",
				password: "Test13.",
			},
		},
	};

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [
				{
					provide: AuthService,
					useValue: {
						createUser: jest.fn(async () => ({ info: data.ok.register, accesstoken: "" })),
						validUserAuth: jest.fn(async () => ({ info: data.ok.login, accesstoken: "" })),
					},
				},
				{
					provide: MailService,
					useValue: {
						addUser: jest.fn(),
					},
				},
			],
		}).compile();

		authController = module.get<AuthController>(AuthController);
		authService = module.get<AuthService>(AuthService);
		mailService = module.get<MailService>(MailService);
	});

	describe("defined mocks", () => {
		it("authController should be defined", () => {
			expect(authController).toBeDefined();
		});

		it("authController should be defined", () => {
			expect(mailService).toBeDefined();
		});

		it("authService should be defined", () => {
			expect(authService).toBeDefined();
		});
	});

	describe("register", () => {
		it("valid ok cicle", async () => {
			const result = { msg: "register ok", info: data.ok.register, accesstoken: "" };

			const resp = await authController.registerUser(data.ok.register);

			expect(authService.createUser).toHaveBeenCalledWith(data.ok.register);
			expect(resp).toEqual(result);
		});

		it("valid error cicle", async () => {
			try {
				jest.spyOn(authService, "createUser").mockRejectedValue(new Error());

				await authController.registerUser(data.error.register);
			} catch (error) {
				expect(error).toEqual(new Error());
				expect(authService.createUser).toHaveBeenCalledWith(data.error.register);
			}
		});
	});

	describe("login", () => {
		it("valid ok cicle", async () => {
			const result = { msg: "login ok", info: data.ok.login, accesstoken: "" };

			const resp = await authController.loginUser(data.ok.login);

			expect(authService.validUserAuth).toHaveBeenCalled();
			expect(resp).toEqual(result);
		});

		it("valid error cicle", async () => {
			try {
				jest.spyOn(authService, "validUserAuth").mockRejectedValue(new Error());

				await authController.registerUser(data.error.login);
			} catch (error) {
				expect(error).toEqual(new Error());
				expect(authService.createUser).toHaveBeenCalled();
			}
		});
	});
});
