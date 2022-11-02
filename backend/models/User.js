const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name : String,
    phonenumber : String,
    imgCollection: {
        type: Array
    }
}, {
    collection: 'users'
})

module.exports = mongoose.model('User', userSchema)