"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const Flag_1 = require("../functions/Flag");
const fs = require("fs");
const path = require("path");
const Name_1 = require("../functions/Name");
(() => {
    try {
        const names = (0, Name_1.getList)(process.argv);
        const mo = (0, Flag_1.getFlag)(process.argv, "mo");
        if (mo === "")
            throw new Error("mo is requier");
        const validMo = fs.existsSync(path.join(path.resolve(), "src", "modules", mo));
        if (!validMo)
            new Error("mo is requier");
        names.forEach((name) => {
            const dirDB = path.join(path.resolve(), "src", "modules", mo, "entitys", name);
            const dirDTO = path.join(path.resolve(), "src", "modules", mo, "dtos", name);
            (0, child_process_1.exec)(`pnpm typeorm entity:create ${dirDB}DB`, () => {
                (0, child_process_1.exec)(`mv -f ${dirDB}DB.ts ${dirDB}.db.ts`);
            });
            (0, child_process_1.exec)(`pnpm typeorm entity:create ${dirDTO}DTO`, () => {
                (0, child_process_1.exec)(`mv -f ${dirDTO}DTO.ts ${dirDTO}.dto.ts`, () => {
                    const file = fs.readFileSync(`${dirDTO}.dto.ts`);
                    fs.unlinkSync(`${dirDTO}.dto.ts`);
                    const doc = `export class ${name}DTO {}`;
                    fs.writeFileSync(`${dirDTO}.dto.ts`, doc);
                });
            });
        });
    }
    catch (error) {
        console.log("error", error.message);
    }
})();
//# sourceMappingURL=entity.js.map