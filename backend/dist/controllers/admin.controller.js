"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_1 = __importDefault(require("../models/admin"));
class AdminController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            admin_1.default.findOne({ 'username': username, 'password': password }, (err, company) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(company);
                }
            });
        };
        this.update = (req, res) => {
            admin_1.default.update({ username: req.body.username }, req.body, (err) => {
                if (err) {
                    console.log(err);
                    res.json({ status: 'Неуспешно ажурирање: Непозната грешка.' });
                }
                else {
                    res.json({ status: 'updated' });
                }
            });
        };
    }
}
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map