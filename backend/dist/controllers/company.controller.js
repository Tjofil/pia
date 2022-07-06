"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyController = void 0;
const company_1 = __importDefault(require("../models/company"));
class CompanyController {
    constructor() {
        this.login = (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            company_1.default.findOne({ 'username': username, 'password': password }, (err, company) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(company);
                }
            });
        };
        this.register = (req, res) => {
            // Check if username or email are not unique
            let username = req.body.username;
            let mail = req.body.mail;
            company_1.default.findOne({ username: username }, (err, foundUsername) => {
                if (foundUsername) {
                    res.json({ status: 'Неуспешна регистрација: Корисничко име већ у употреби.' });
                }
                else {
                    company_1.default.findOne({ mail: mail }, (err, foundMail) => {
                        if (foundMail) {
                            res.json({ status: 'Неуспешна регистрација: Мејл већ у употреби.' });
                        }
                        else {
                            let companyToRegister = new company_1.default(req.body);
                            companyToRegister.save((err, company) => {
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
                }
            });
        };
        this.update = (req, res) => {
            company_1.default.update({ username: req.body.username }, req.body, (err) => {
                if (err) {
                    console.log(err);
                    res.json({ status: 'Неуспешно ажурирање: Непозната грешка.' });
                }
                else {
                    res.json({ status: 'updated' });
                }
            });
        };
        this.addByTaxId = (req, res) => {
            company_1.default.findOne({ taxId: req.body.taxId }, (err, foundCompany) => {
                if (err) {
                    res.json({ status: 'Неуспешна претрага: Непозната грешка.' });
                }
                else if (foundCompany) {
                    let customer = {
                        taxId: req.body.taxId,
                        name: foundCompany.companyName,
                        daysForPaying: req.body.daysForPaying,
                        rebate: req.body.rebate
                    };
                    company_1.default.updateOne({ username: req.body.username }, { $push: { 'customers': customer } }, (err, response) => {
                        if (err) {
                            res.json({ status: 'Неуспешна претрага: Непозната грешка.' });
                        }
                        else {
                            res.json({ status: 'added' });
                        }
                    });
                }
                else {
                    res.json({ status: 'Не постоји предузеће са траженим ПИБ-ом.' });
                }
            });
        };
        this.getAll = (req, res) => {
            company_1.default.find({}, (err, companies) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.json(companies);
                }
            });
        };
    }
}
exports.CompanyController = CompanyController;
//# sourceMappingURL=company.controller.js.map