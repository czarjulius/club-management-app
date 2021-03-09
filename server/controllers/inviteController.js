import {Invitation, Club, User} from "../db/models";
// import { sendInvite, fetchUserPendingInvites} from "../models/inviteQuery";

class Invite{

  static async invite(req, res){
    try {
      const { email } = req.authUser;

      const sender = email;
      const {invitee_email} = req.body;
      const {club_id} = req.params

      await Invitation.create({sender_email: sender, invitee_email , club_id});  

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
      // const { email } = req.authUser;

      const user_email = 'd@test.com'

    const pendingInvitations = await Invitation.findAll({
      include: [
        {model: Club, attributes:['id', 'name']},
        {model: User, attributes:['id', 'name']}
      ],
      where:{
        invitee_email:user_email
      }
    })

    console.log(pendingInvitations, 'kkkk');

    // const pendingInvites = await pendingInvitations.map((invite) =>{
    //   // return invite.dataValues.User.dataValues;
    //   console.log(invite);
    // })
      
    //   return res.status(200).json({
    //   status: 200,
    //   message: "Pending invitations",
    //   data: [...pendingInvitations.rows]
    // });

  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }
  }
}

export default Invite