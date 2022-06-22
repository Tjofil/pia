import express from 'express';
import cors from 'cors'
import mongoose, { mongo } from 'mongoose'
// import userRouter from './routers/user.router';
// import newsRouter from './routers/news.routes';


const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/usersDB')

const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('db connected')
})

const router = express.Router()
// router.use('/users', userRouter)
// router.use('/news', newsRouter)

app.use('/', router)
app.listen(4000, () => console.log(`Express server running on port 4000`));