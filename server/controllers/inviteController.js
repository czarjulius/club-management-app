import Club from "../db/models/club";
import User_Club from "../db/models/user_club";

import Invitation from "../db/models/invitation";import { sendInvite, fetchUserPendingInvites} from "../models/inviteQuery";

class InviteController{

  static async invite(req, res){
    try {
      const { email: sender, id } = req.authUser;
      const {invitee_email} = req.body;
      const {club_id} = req.params
      
      await Invitation.create({sender_email:sender, sender_id: id, invitee_email, club_id}, async(err, invite)=>{
        if (invite) {
          return res.status(201).json({
            status: 201,
            message: "Invitation sent successful",
          });
        }
      })
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  static async fetchUserPendingInvitations(req, res){
    try {    
      const { email } = req.authUser;

      const user_email = email

    const pendingInvitations = await db.query(fetchUserPendingInvites, [user_email]);
      
      
      return res.status(200).json({
      status: 200,
      message: "Pending invitations",
      data: [...pendingInvitations.rows]
    });

  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }
  }
}

export default InviteController