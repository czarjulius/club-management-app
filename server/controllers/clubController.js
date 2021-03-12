import dateFormat from 'dateformat';
import Club from "../db/models/club";
import User_Club from "../db/models/user_club";
import Invitation from "../db/models/invitation";
import { 
  createClub, 
  getSingleClub, 
  joinClub , 
  checkUserInClub, 
  fetchUserClubsQuery,
  fetchAllClubMembersQuery,
  getSingleClubById,
  deleteMember,
  dailyJoinCount
} from "../models/clubQuery";

class ClubController{

  static async profileClub(req, res) {
    try {
      const { id: admin_id } = req.authUser;

      let { name } = req.body;
      name = name.toLowerCase().trim();

      if (!name) {
        return res.status(400).json({
          status: 400,
          error: "Club must have a name"
        });
      }

      await Club.findOne({ name }, async(err, club) =>{
        if (club){
          return res.status(409).json({
            status: 409,
            error: `${name.toUpperCase()} is already profiled`
          });
        }

       await Club.create({ name, admin_id }, async (err, club)=> {
          if (club) {
            await User_Club.create({user_id: admin_id, club_id: club._doc._id}, async(err, user_club)=>{
              if (user_club) {
                return await res.status(201).json({
                  status: 201,
                  message: "Profiling successful",
                  data: {
                      id: club._doc._id,
                      name: club._doc.name,
                      admin_id,
                  }
                });
              }
            })
          }
        });
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message
      });
    }
  }

  static async joinClub(req,res){
    try {
    const{club_id} = req.params
    const { id: user_id } = req.authUser;

    let {decission, invite_id} = req.body;

    await User_Club.findOne({ user_id, club_id }, async (err, user_club)=> {
      if(user_club){
        decission = 'accepted'
        await Invitation.updateOne({_id: invite_id}, {status:decission})

        return res.status(409).json({
          status: 409,
          error: "You are already a member"
        });
      }
      })
      await Invitation.updateOne({_id: invite_id}, {status:decission})

      if (decission === 'accepted') {
        await User_Club.create({user_id, club_id}, async(err, user_club)=>{
          if (user_club) {
            return res.status(201).json({
              status: 201,
              message: "Joined successful"
            });
          }
        })
      }else{
        return res.status(200).json({
          status: 200,
          message: "Invitation rejected"
        });
      }
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }
  }

  static async fetchClubByUserId(req, res){
    try {
      const { id: user_id } = req.authUser;

      await User_Club.find({ user_id}, async (err, user_club)=> {
        if (user_club) {
         const clubs =  await user_club.map((club)=>{
           return {id: club.club_id._id, name: club.club_id.name}
          })

          return res.status(200).json({
            status: 200,
            message: "Clubs successful",
            data: [...clubs]
          });

        }
      }).populate('club_id');
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }
  }

  static async fetchAllClubMembers(req, res){
    try {    
      const {club_id} = req.params

      await User_Club.find({ club_id}, async (err, user_club)=> {
        if (user_club) {
        const members =  await user_club.map((user)=>{
          return {id: user.user_id._id, name: user.user_id.name}
          })
          return res.status(200).json({
            status: 200,
            message: "Fetched members successfully",
            data: [...members]
          });
        }
      }).populate('user_id');
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }
  }

  static async deleteClubMember(req, res){
    try {
      const { id: isCreator_id } = req.authUser;
      const { user_club_id } = req.params;
  
      await User_Club.findOne({ _id:user_club_id}, async (err, user_club)=> {
        if (user_club && (user_club.club_id.admin_id === isCreator_id)) {
          await user_club.remove();

          return res.status(200).json({
            status: 200,
            message: "Deleted successfully",
          });
        }
      }).populate('club_id');
    }catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }

  }

  static async getClubById(req, res){
    try {
      const { club_id} = req.params;
  
      await Club.findOne({ _id: club_id}, async (err, club)=> {
        if (club) {
          return res.status(200).json({
            status: 200,
            message: "Fetched successfully",
            data:{
              id: club._id,
              name: club.name
            }
          });
        }
      });
    }catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }
  }

  static async dailyReport(req, res){
    try {
      const { club_id} = req.params;

      const res = await User_Club.aggregate( [
        {
          $unwind: "$items"
      },
        
        {
          $group: {
            created_at: "$items.created_at",
             count: { $sum: "$items.user_id" }
          }
        }
      ] )

      console.log(res, 'ooooooooooo');
      
  
      // let repot_label = []
      // let repot_value = []
      // const report = await db.query(dailyJoinCount, [club_id]);
      // report.rows.map((value)=>{
      //   const now = dateFormat(new Date(value.days), "dd:mmmm");
      //   repot_label.push(now)
      //   repot_value.push(parseInt(value.total))
      // })
  
      // return res.status(200).json({
      //   status: 200,
      //   message: "Counted successfully",
      //   data:{
      //     repot_label,
      //     repot_value
      //   }
      // });

    }catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }

  }
}

export default ClubController