"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shelljs_1 = require("shelljs");
const pre_1 = require("./pre");
const new_1 = require("./new");
const definePk = (prePk, newPk) => {
    const preKeys = Object.keys(prePk);
    const newKeys = Object.keys(newPk);
    const resp = preKeys.filter((pre) => !newKeys.includes(pre));
    return resp;
};
const dependencies = definePk(pre_1.default.dependencies, new_1.default.dependencies).join(' ');
const devDependencies = definePk(pre_1.default.devDependencies, new_1.default.devDependencies).join(' ');
console.log('dependencies', dependencies);
console.log('');
console.log('devDependencies', devDependencies);
(0, shelljs_1.exec)(`pnpm add ${dependencies} && pnpm add ${devDependencies}`);
//# sourceMappingURL=migrate.js.map