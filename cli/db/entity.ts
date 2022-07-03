/** @format */

import { exec } from "child_process";
import { getFlag } from "../functions/Flag";
import * as fs from "fs";
import * as path from "path";
import { getList } from "../functions/Name";

(() => {
	try {
		const names = getList(process.argv);

		const mo = getFlag(process.argv, "mo");

		if (mo === "") throw new Error("mo is requier");

		const validMo = fs.existsSync(path.join(path.resolve(), "src", "modules", mo));

		if (!validMo) new Error("mo is requier");

		names.forEach((name) => {
			const dirDB = path.join(path.resolve(), "src", "modules", mo, "entity", name);
			const dirDTO = path.join(path.resolve(), "src", "modules", mo, "dto", name);

			exec(`pnpm typeorm entity:create ${dirDB}DB`, () => {
				exec(`mv -f ${dirDB}DB.ts ${dirDB}.db.ts`);
			});

			exec(`pnpm typeorm entity:create ${dirDTO}DTO`, () => {
				exec(`mv -f ${dirDTO}DTO.ts ${dirDTO}.dto.ts`, () => {
					const file = fs.readFileSync(`${dirDTO}.dto.ts`);

					fs.unlinkSync(`${dirDTO}.dto.ts`);

					const doc = `export class ${name}DTO {}`;

					fs.writeFileSync(`${dirDTO}.dto.ts`, doc);
				});
			});
		});
	} catch (error) {
		console.log("error", error);
	}
})();
