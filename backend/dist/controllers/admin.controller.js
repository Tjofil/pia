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
            admin_1.default.findOne({ 'username': username, 'password': password }, (err, admin) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(admin);
                }
            });
        };
        this.changePass = (req, res) => {
            admin_1.default.findOne({ username: req.body.username }, (err, admin) => {
                if (err || admin == null) {
                    console.log(err);
                    res.json({ status: 'Непозната грешка.' });
                }
                else {
                    if (req.body.oldPassword != admin.password) {
                        res.json({ status: 'Унета неисправна стара лозинка.' });
                    }
                    else if (admin.password == req.body.password) {
                        res.json({ status: 'Нова лозинка не може бити иста као стара.' });
                    }
                    else {
                        admin_1.default.updateOne({ username: req.body.username }, { password: req.body.password }, (err, resp) => {
                            if (err) {
                                res.json({ status: 'Непозната грешка' });
                            }
                            else {
                                res.json({ status: 'updated' });
                            }
                        });
                    }
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