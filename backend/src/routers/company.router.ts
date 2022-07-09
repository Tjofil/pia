import express from 'express';
import { CompanyController } from '../controllers/company.controller'

const companyRouter = express.Router()

companyRouter.route('/login').post(
    (req, res)=>new CompanyController().login(req, res)
)

companyRouter.route('/register').post(
    (req, res)=>new CompanyController().register(req, res)
)

companyRouter.route('/update').post(
    (req, res)=>new CompanyController().update(req, res)
)

companyRouter.route('/addByTaxId').post(
    (req, res)=>new CompanyController().addByTaxId(req, res)
)

companyRouter.route('/getAll').get(
    (req, res)=>new CompanyController().getAll(req, res)
)


companyRouter.route('/getByIdCard').post(
    (req, res)=>new CompanyController().getByIdCard(req, res)
)

companyRouter.route('/getLast').get(
    (req, res)=>new CompanyController().getLastReceipts(req, res)
)



export default companyRouter

