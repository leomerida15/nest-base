"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlag = void 0;
function getFlag(argv, flag) {
    const item = argv.find((item) => item.includes(`${flag}=`));
    if (item)
        return item.split("mp=")[1].split(" ")[0];
    return "";
}
exports.getFlag = getFlag;
//# sourceMappingURL=catshFlag.js.map