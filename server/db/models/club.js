const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClubSchema = new Schema({
    name:{
        type: String,
        required:true,
        unique: true,
        index: true
    },
    admin_id:{
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required:true,
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

module.exports = mongoose.model('Clubs', ClubSchema);