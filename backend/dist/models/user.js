"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let User = new Schema({
    username: String,
    name: String,
    surname: String,
    password: String,
    idCard: Number,
    phone: String,
});
exports.default = mongoose_1.default.model('UserModel', User, 'users');
//# sourceMappingURL=user.js.map