const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
        index: true
    },
    password:{
        type:String,
        required: true,
    },
    created_at:{
        type:Date,
        default:Date.now,
    },
    updated_at:{
        type:Date,
        default:Date.now,
    }
});

module.exports = mongoose.model('Users', UserSchema);