"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_1 = __importDefault(require("../models/user"));
class UserController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(user);
                }
            });
        };
        this.changePass = (req, res) => {
            user_1.default.findOne({ username: req.body.username }, (err, user) => {
                if (err || user == null) {
                    console.log(err);
                    res.json({ status: 'Непозната грешка.' });
                }
                else {
                    if (req.body.oldPassword != user.password) {
                        res.json({ status: 'Унета неисправна стара лозинка.' });
                    }
                    else if (user.password == req.body.password) {
                        res.json({ status: 'Нова лозинка не може бити иста као стара.' });
                    }
                    else {
                        user_1.default.updateOne({ username: req.body.username }, { password: req.body.password }, (err, resp) => {
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
        this.register = (req, res) => {
            // Check if username or email are not unique
            let username = req.body.username;
            user_1.default.findOne({ username: username }, (err, foundUsername) => {
                if (foundUsername) {
                    res.json({ status: 'Неуспешна регистрација: Корисничко име већ у употреби.' });
                }
                else {
                    let userToRegister = new user_1.default(req.body);
                    userToRegister.save((err, user) => {
                        if (err) {
                            console.log(err);
                            res.json({ status: 'Неуспешна регистрација: Непозната грешка.' });
                        }
                        else {
                            res.json({ status: 'registered' });
                        }
                    });
                }
            });
        };
        this.update = (req, res) => {
            user_1.default.update({ username: req.body.username }, req.body, (err) => {
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
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map