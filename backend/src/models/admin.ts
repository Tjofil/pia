import mongoose from "mongoose"

const Schema = mongoose.Schema

let Admin = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    }
});

export default mongoose.model('AdminModel', Admin, 'admins')
