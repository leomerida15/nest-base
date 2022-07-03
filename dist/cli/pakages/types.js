"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const Flag_1 = require("../functions/Flag");
const Mpks = (0, Flag_1.getFlag)(process.argv, "pm") || "pnpm";
const pks = process.argv.slice(2).join(" ");
const pksTypes = process.argv
    .slice(2)
    .map((pk) => `@types/${pk}`)
    .join(" ");
(0, child_process_1.exec)(`${Mpks} add ${pks}`, () => (0, child_process_1.exec)(`${Mpks} add ${pksTypes} -d`));
//# sourceMappingURL=types.js.map