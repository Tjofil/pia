import express from 'express'
import CompanyModel from '../models/company'
import company from '../models/company';

export class CompanyController {

    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        CompanyModel.findOne({ 'username': username, 'password': password }, (err, company) => {
            if (err) {
                console.log(err)
            } else {
                res.json(company)
            }
        })
    }

    register = (req: express.Request, res: express.Response) => {
        // Check if username or email are not unique
        let username = req.body.username;
        let mail = req.body.mail;
        CompanyModel.findOne({ username: username }, (err, foundUsername) => {
            if (foundUsername) {
                res.json({ status: 'Неуспешна регистрација: Корисничко име већ у употреби.' })
            }
            else {
                CompanyModel.findOne({ mail: mail }, (err, foundMail) => {
                    if (foundMail) {
                        res.json({ status: 'Неуспешна регистрација: Мејл већ у употреби.' })
                    } else {
                        let companyToRegister = new CompanyModel(req.body);
                        companyToRegister.save((err, company) => {
                            if (err) {
                                console.log(err)
                                res.json({ status: 'Неуспешна регистрација: Непозната грешка.' })
                            }
                            else {
                                res.json({ status: 'registered' })
                            }
                        })
                    }
                })
            }
        })
    }

    update = (req: express.Request, res: express.Response) => {
        CompanyModel.update({ username: req.body.username }, req.body, (err) => {
            if (err) {
                console.log(err)
                res.json({ status: 'Неуспешно ажурирање: Непозната грешка.' })
            } else {
                res.json({ status: 'updated' })
            }
        });
    }

    addByTaxId = (req: express.Request, res: express.Response) => {
        CompanyModel.findOne({ taxId: req.body.taxId }, (err, foundCompany) => {
            if (err) {
                res.json({ status: 'Неуспешна претрага: Непозната грешка.' });
            } else if (foundCompany) {
                let customer = {
                    taxId: req.body.taxId,
                    name: foundCompany.companyName,
                    daysForPaying: req.body.daysForPaying,
                    rebate: req.body.rebate
                }
                CompanyModel.updateOne({ username: req.body.username }, { $push: { 'customers': customer } }, (err, response) => {
                    if (err) {
                        res.json({ status: 'Неуспешна претрага: Непозната грешка.' });
                    } else {
                        res.json({ status: 'added' });
                    }
                })
            } else {
                res.json({ status: 'Не постоји предузеће са траженим ПИБ-ом.' })
            }
        })

    }

    changePass = (req: express.Request, res: express.Response) => {
        CompanyModel.findOne({ username: req.body.username }, (err, company) => {
            if (err || company == null) {
                console.log(err)
                res.json({ status: 'Непозната грешка.' });
            } else {
                if (req.body.oldPassword != company.password) {
                    res.json({ status: 'Унета неисправна стара лозинка.' })
                } else if (company.password == req.body.password) {
                    res.json({ status: 'Нова лозинка не може бити иста као стара.' })
                } else {
                    CompanyModel.updateOne({ username: req.body.username }, { password: req.body.password }, (err, resp) => {
                        if (err) {
                            res.json({ status: 'Непозната грешка' });
                        } else {
                            res.json({ status: 'updated' })
                        }
                    })
                }

            }
        })
    }

    getAll = (req: express.Request, res: express.Response) => {
        CompanyModel.find({}, (err, companies) => {
            if (err) {
                console.log(err)
            } else {
                res.json(companies)
            }
        });
    }

    getByIdCard = (req: express.Request, res: express.Response) => {
        CompanyModel.find({}, (err, companies) => {
            if (err) {
                console.log(err)
            } else {
                let param = req.body.idCard;
                let toReturn = [];
                companies.forEach(company => {
                    company.closedReceipts.forEach(receipt => {
                        console.log(receipt.idCard)
                        if (receipt.buyerId == param) {
                            toReturn.push(receipt);
                        }
                    });
                });
                res.json(toReturn)
            }
        });
    }

    getLastReceipts = (req: express.Request, res: express.Response) => {
        CompanyModel.find({}, (err, companies) => {
            if (err) {
                console.log(err)
            } else {
                let dummy = [];
                companies.forEach(company => {
                    company.closedReceipts.forEach(receipt => {
                        dummy.push(receipt);
                    });
                });
                dummy.sort((receipt1, receipt2) => {
                    let date1: Date = new Date(receipt1.closingDate);
                    let date2: Date = new Date(receipt2.closingDate);
                    return date2.getTime() - date1.getTime()
                })
                let toReturn = []
                for (let i = 0; i < Math.min(dummy.length, 5); ++i) {
                    toReturn.push(dummy[i]);
                }
                res.json(toReturn)
            }
        });
    }

}