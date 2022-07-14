import express from 'express';
import { AdminController } from '../controllers/admin.controller';

const adminRouter = express.Router()

adminRouter.route('/login').post(
    (req, res) => new AdminController().login(req, res)
)

adminRouter.route('/changePass').post(
    (req, res) => new AdminController().changePass(req, res)
)

adminRouter.route('/update').post(
    (req, res) => new AdminController().update(req, res)
)


export default adminRouter

