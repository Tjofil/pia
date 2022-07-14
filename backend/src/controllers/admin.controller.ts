import express from 'express'
import AdminModel from '../models/admin'

export class AdminController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        AdminModel.findOne({ 'username': username, 'password': password }, (err, admin) => {
            if (err) {
                console.log(err)
            } else {
                res.json(admin)
            }
        })
    }

    changePass = (req: express.Request, res: express.Response) => {
        AdminModel.findOne({ username: req.body.username }, (err, admin) => {
            if (err || admin == null) {
                console.log(err)
                res.json({ status: 'Непозната грешка.' });
            } else {
                if (req.body.oldPassword != admin.password) {
                    res.json({ status: 'Унета неисправна стара лозинка.' })
                } else if (admin.password == req.body.password) {
                    res.json({ status: 'Нова лозинка не може бити иста као стара.' })
                } else {
                    AdminModel.updateOne({ username: req.body.username }, { password: req.body.password }, (err, resp) => {
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

    update = (req: express.Request, res: express.Response) => {
        AdminModel.update({ username: req.body.username }, req.body, (err) => {
            if (err) {
                console.log(err)
                res.json({ status: 'Неуспешно ажурирање: Непозната грешка.' })
            } else {
                res.json({ status: 'updated' })
            }
        });
    }


}
