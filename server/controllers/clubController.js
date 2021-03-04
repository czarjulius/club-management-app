import dateFormat from 'dateformat';
import db from "../models/db";
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

import { updateInvite } from '../models/inviteQuery'

class Club{

  static async profileClub(req, res) {
    try {
      const { id } = req.authUser;

      const admin_id = id;

      let { name } = req.body;

      name = name.toLowerCase().trim();

      if (!name) {
        return res.status(400).json({
          status: 400,
          error: "Club must have a name"
        });
      }

      const checkName = await db.query(getSingleClub, [name]);
      if (checkName.rows.length) {
        return res.status(409).json({
          status: 409,
          error: `${name.toUpperCase()} is already profiled`
        });
      }

      const values = [name, admin_id];
      const result = await db.query(createClub, values);  

      await db.query(joinClub, [admin_id, result.rows[0].id]) 


      return res.status(201).json({
        status: 201,
        message: "Profiling successful",
        data: {
            id: result.rows[0].id,
            name,
            admin_id,
          registeredOn: result.rows[0].registeredon
        }
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
    const { id } = req.authUser;

    let {decission, invite_id} = req.body;

    const user_id = id

    const checkUser = await db.query(checkUserInClub, [user_id, club_id]);
      if (checkUser.rows.length) {
        decission = 'accepted'
        await db.query(updateInvite,[decission, invite_id])

        return res.status(409).json({
          status: 409,
          error: "You are already a member"
        });
      }

      if (decission === 'accepted') {
        await db.query(joinClub, [user_id, club_id]) 
      }

    await db.query(updateInvite,[decission, invite_id])

    return res.status(201).json({
      status: 201,
      message: "Joined successful"
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }

  }

  static async fetchClubByUserId(req, res){
    try {
      const { id } = req.authUser;
      const user_id = id

      const fetchUserClubs = await db.query(fetchUserClubsQuery, [user_id]);

      return res.status(200).json({
        status: 200,
        message: "Clubs successful",
        data: [...fetchUserClubs.rows]
      });

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

    const AllClubMembers = await db.query(fetchAllClubMembersQuery, [club_id]);
      
      
      return res.status(200).json({
      status: 200,
      message: "Fetched members successfully",
      data: [...AllClubMembers.rows]
    });

  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }
  }

  static async deleteClubMember(req, res){
    try {
      const { id } = req.authUser;

      const isCreator_id = id;
      const { user_club_id, club_id} = req.params;
  
      const club = await db.query(getSingleClubById, [club_id]);
  
      if (club.rows[0].admin_id === isCreator_id) {
        await db.query(deleteMember, [user_club_id]);

        return res.status(200).json({
          status: 200,
          message: "Deleted successfully",
        });
      }

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
  
      const club = await db.query(getSingleClubById, [club_id]);
  
      if (club.rows[0]) {
        return res.status(200).json({
          status: 200,
          message: "Fetched successfully",
          data:{...club.rows[0]}
        });
      }

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
  
      let repot_label = []
      let repot_value = []
      const report = await db.query(dailyJoinCount, [club_id]);
      report.rows.map((value)=>{
        const now = dateFormat(new Date(value.days), "dd:mmmm");
        repot_label.push(now)
        repot_value.push(parseInt(value.total))
      })
  
      return res.status(200).json({
        status: 200,
        message: "Counted successfully",
        data:{
          repot_label,
          repot_value
        }
      });

    }catch (err) {
    return res.status(500).json({
      status: 500,
      error: err.message
    });
  }

  }
}

export default Club