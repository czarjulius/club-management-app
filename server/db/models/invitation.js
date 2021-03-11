const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InvitationSchema = new Schema({
    sender_email:{
      type: String,
      required:true,
    },
    invitee_email:{
      type: String,
      required:true,
    },
    sender_id:{
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required:true,
    },
    club_id:{
      type: Schema.Types.ObjectId,
      ref: 'Clubs',
      required:true,
    },
    status:{
      type: String,
      required:true,
      default: 'pending'
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

module.exports = mongoose.model('Invitations', InvitationSchema);