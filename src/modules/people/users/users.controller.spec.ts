/** @format */

import { Test, TestingModule } from "@nestjs/testing";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

describe("UsersController", () => {
	let usersController: UsersController;
	let usersService: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: {
						allUsers: jest.fn(() => []),
					},
				},
			],
		}).compile();

		usersController = module.get<UsersController>(UsersController);
		usersService = module.get<UsersService>(UsersService);
	});

	it("should be defined", () => {
		expect(usersController).toBeDefined();
	});

	describe("valis all user", () => {
		it("allUsers ok", async () => {
			const result = await usersController.allUser();

			expect(usersService.allUsers).toHaveBeenCalledTimes(1);
			console.log("result", result);
			expect(result).toEqual({ msg: "all users ok", info: [] });
		});
	});
});
