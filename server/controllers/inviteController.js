import Invitation from "../db/models/invitation";

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

      await Invitation.find({ invitee_email: email}, async (err, invites)=> {
        if (invites) {
        const pendingInvites =  await invites.map((invite)=>{
          return {
            id: invite._id,
            sender: invite.sender_id.name,
            sender_id:invite.sender_id._id,
            club:invite.club_id.name,
            club_id: invite.club_id._id,
          }
          })
          return res.status(200).json({
            status: 200,
            message: "Pending invitations",
            data: [...pendingInvites]
        });
        }
      }).populate(['sender_id', 'club_id']);
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }
  }
}

export default InviteController