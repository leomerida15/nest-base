"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const route = process.argv[3];
(0, child_process_1.exec)(`pnpm typeorm  entity:create ${(0, path_1.join)((0, path_1.resolve)(), "src/modules", route)}`);
//# sourceMappingURL=db.js.map