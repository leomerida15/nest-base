"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlag = void 0;
function getFlag(argv, flag) {
    const data = argv.slice(2);
    const item = data.find((item) => item.includes(`${flag}=`));
    if (!item)
        return "";
    const resp = item.replace(`${flag}=`, "");
    return resp;
}
exports.getFlag = getFlag;
//# sourceMappingURL=Flag.js.map