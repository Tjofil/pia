import express from 'express';
import cors from 'cors'
import mongoose, { mongo } from 'mongoose'
import companyRouter from './routers/company.router';
import adminRouter from './routers/admin.router';
import userRouter from './routers/user.router';

const app = express();
app.use(cors())
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

mongoose.connect('mongodb://localhost:27017/db')

const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router()
router.use('/companies', companyRouter)
router.use('/admin', adminRouter)
router.use('/users', userRouter)



app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));