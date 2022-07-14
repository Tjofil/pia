import express from 'express'
import UserModel from '../models/user'

export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;
        UserModel.findOne({ 'username': username, 'password': password }, (err, user) => {
            if (err) {
                console.log(err)
            } else {
                res.json(user)
            }
        })
    }

    changePass = (req: express.Request, res: express.Response) => {
        UserModel.findOne({ username: req.body.username }, (err, user) => {
            if (err || user == null) {
                console.log(err)
                res.json({ status: 'Непозната грешка.' });
            } else {
                if (req.body.oldPassword != user.password) {
                    res.json({ status: 'Унета неисправна стара лозинка.' })
                } else if (user.password == req.body.password) {
                    res.json({ status: 'Нова лозинка не може бити иста као стара.' })
                } else {
                    UserModel.updateOne({ username: req.body.username }, { password: req.body.password }, (err, resp) => {
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

    register = (req: express.Request, res: express.Response) => {
        // Check if username or email are not unique
        let username = req.body.username;
        UserModel.findOne({ username: username }, (err, foundUsername) => {
            if (foundUsername) {
                res.json({ status: 'Неуспешна регистрација: Корисничко име већ у употреби.' })
            }
            else {
                let userToRegister = new UserModel(req.body);
                userToRegister.save((err, user) => {
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
