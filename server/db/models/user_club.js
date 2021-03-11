const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User_ClubSchema = new Schema({
    user_id:{
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required:true,
    },
    club_id:{
      type: Schema.Types.ObjectId,
      ref: 'Clubs',
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

module.exports = mongoose.model('User_Clubs', User_ClubSchema);