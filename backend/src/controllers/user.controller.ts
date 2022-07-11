import express from 'express'
import UserModel from '../models/user'

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        UserModel.findOne({ 'username': username, 'password': password }, (err, company) => {
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
        UserModel.findOne({ username: username }, (err, foundUsername) => {
            if (foundUsername) {
                res.json({ status: 'Неуспешна регистрација: Корисничко име већ у употреби.' })
            }
            else {
                let userToRegister = new UserModel(req.body);
                userToRegister.save((err, company) => {
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

    update = (req: express.Request, res: express.Response) => {
        UserModel.update({ username: req.body.username }, req.body, (err) => {
            if (err) {
                console.log(err)
                res.json({ status: 'Неуспешно ажурирање: Непозната грешка.' })
            } else {
                res.json({ status: 'updated' })
            }
        });
    }
}
