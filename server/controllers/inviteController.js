import {Invitation, Club, User} from "../db/models";
// import { sendInvite, fetchUserPendingInvites} from "../models/inviteQuery";

class Invite{

  static async invite(req, res){
    try {
      const { email, id } = req.authUser;

      const sender = email;
      const {invitee_email} = req.body;
      const {club_id} = req.params

      await Invitation.create({sender_email: sender, sender_id: id, invitee_email , club_id});  

      return res.status(201).json({
        status: 201,
        message: "Invitation sent successful",
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  static async fetchUserPendingInvitations(req, res){
    try {    
      const user_email = email

    const pendingInvitations = await Invitation.findAll({
      attributes: ['id', 'sender_id', 'club_id'],
      include: [
        {model: Club, attributes:['id', 'name']},
        {model: User, attributes:['id', 'name']},
    ],
      where:{
        invitee_email:user_email, status:'pending'
      }
    })

    const pendingInvites = await pendingInvitations.map((invite) =>{
      return {
        id:invite.dataValues.id,
        sender:invite.dataValues.User.dataValues.name,
        sender_id:invite.dataValues.sender_id,
        club:invite.dataValues.Club.dataValues.name,
        club_id: invite.dataValues.club_id,
      }
    })
      
      return res.status(200).json({
      status: 200,
      message: "Pending invitations",
      data: [...pendingInvites]
    });

  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }
  }
}

export default Invite