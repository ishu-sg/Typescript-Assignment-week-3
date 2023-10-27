"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonFunctions = void 0;
class CommonFunctions {
    toTitleCase(str) {
        return str.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
}
exports.CommonFunctions = CommonFunctions;
//# sourceMappingURL=commonFunctions.js.map