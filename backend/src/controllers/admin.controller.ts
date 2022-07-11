import express from 'express'
import AdminModel from '../models/admin'

export class AdminController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        AdminModel.findOne({ 'username': username, 'password': password }, (err, company) => {
            if (err) {
                console.log(err)
            } else {
                res.json(company)
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
