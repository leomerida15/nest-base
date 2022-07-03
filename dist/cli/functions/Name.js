"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getList = void 0;
function getList(argv) {
    const data = argv.slice(2);
    const item = data.filter((item) => !item.includes(`=`));
    if (item)
        return item;
    return [];
}
exports.getList = getList;
//# sourceMappingURL=Name.js.map