import sequelize from 'sequelize'
import dateFormat from 'dateformat';
import {Club, User_Club, User, Invitation} from "../db/models";

class ClubController{

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

      const [club, created] = await Club.findOrCreate({
        where: { name },
        defaults: {
          name, admin_id
        },
      });


      if (!created) {
        return res.status(409).json({
          status: 409,
          error: `${name.toUpperCase()} is already profiled`
        });
      }

      await User_Club.create({user_id: admin_id, club_id: club.dataValues.id})

      return res.status(201).json({
        status: 201,
        message: "Profiling successful",
        data: {
          id: club.dataValues.id,
          name: club.dataValues.name,
          admin_id:club.dataValues.admin_id
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
    const { club_id} = req.params
    const { id } = req.authUser;

    let {decission, invite_id} = req.body;

    const user_id = id

    const user_club = await User_Club.findOne({ where: { user_id, club_id } });

    if (user_club && user_club.dataValues) {
      decission = 'accepted'
      await Invitation.update({ status: decission }, {
        where: {
          id: invite_id
        }
      });

      return res.status(409).json({
        status: 409,
        error: "You are already a member"
      });
    }

      if (decission === 'accepted') {
        await User_Club.create({user_id, club_id}) 
      }

    await Invitation.update({ status: decission }, {where :{id: invite_id}})

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

      const fetchUserClubs = await User_Club.findAll({
        include:{
          model: Club,
          attributes: [
            'id',
            'name'
          ],
        },
        where:{
          user_id
        }
      })

      const clubs = await fetchUserClubs.map((club) =>{
        return club.dataValues.Club.dataValues;
      })

      return res.status(200).json({
        status: 200,
        message: "Clubs retrieved successful",
        data: [...clubs]
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

      const AllClubMembers = await User_Club.findAll({
        include:{
          model: User,
          attributes: [
            'id',
            'name'
          ],
        },
        where:{
          club_id
        }
      })

      const members = await AllClubMembers.map((member) =>{
        return member.dataValues.User.dataValues;
      })

      return res.status(200).json({
      status: 200,
      message: "Fetched members successfully",
      data: [...members]
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
  
      const club = await Club.findOne({id:club_id});
      
      if (club.dataValues.admin_id === isCreator_id) {
        await User_Club.destroy({
          where: {
            id: user_club_id
          }
        });
        return res.status(200).json({
          status: 200,
          message: "Deleted successfully",
        });
      }else{
        return res.status(403).json({
          status: 403,
          message: "You are not the admin of this club",
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
  
      const club = await Club.findOne({id:club_id});
  
      if (club && club.dataValues) {
        return res.status(200).json({
          status: 200,
          message: "Fetched successfully",
          data:{...club.dataValues}
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
  
      const report = await User_Club.findAll({
        attributes: [
          [ sequelize.fn('date_trunc', 'day', sequelize.col('createdAt')), 'day'],
          [ sequelize.fn('count', 'user_id'), 'total']
        ],
        where: {
          club_id,
        },
        group: 'day'
      })

      let repot_label = []
      let repot_value = []

      await report.map((value)=>{
        const now = dateFormat(new Date(value.dataValues.day), "dd:mmmm");
        repot_label.push(now)
        repot_value.push(parseInt(value.dataValues.total))
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

export default ClubController