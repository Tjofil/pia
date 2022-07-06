import express from 'express'
import CompanyModel from '../models/company'

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

    getAll = (req: express.Request, res: express.Response) => {
        CompanyModel.find({}, (err, companies) => {
            if (err) {
                console.log(err)
            } else {
                res.json(companies)
            }
        });
    }

}