"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isChildOf = isChildOf;
const path_1 = __importDefault(require("path"));
/**
 * Checks if a given path (dirOrFile) is a child of another given path (parent).
 */
function isChildOf(parent, dirOrFile) {
    const relative = path_1.default.relative(parent, dirOrFile);
    return (Boolean(relative) &&
        !relative.startsWith("..") &&
        !path_1.default.isAbsolute(relative));
}
//# sourceMappingURL=isChildOf.js.map