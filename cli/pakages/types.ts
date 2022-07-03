/** @format */

import { exec } from "child_process";
import { getFlag } from "../functions/Flag";

// /** @format */

const Mpks = getFlag(process.argv, "pm") || "pnpm";

const pks = process.argv.slice(2).join(" ");

const pksTypes = process.argv
	.slice(2)
	.map((pk) => `@types/${pk}`)
	.join(" ");

exec(`${Mpks} add ${pks}`, () => exec(`${Mpks} add ${pksTypes} -d`));
