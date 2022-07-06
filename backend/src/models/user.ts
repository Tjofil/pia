import mongoose from 'mongoose'

const Schema = mongoose.Schema

let User = new Schema({
    username: String,
    name: String,
    surname: String,
    password: String,
    idCard: Number,
    phone: String,

})

export default mongoose.model('UserModel', User, 'users')
