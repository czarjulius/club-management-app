import express from 'express';
import clubController from '../controllers/clubController';
import authenticate from '../middlewares/Authentication';

const router = express.Router();

router.post('/profileclub',  clubController.profileClub);
router.post('/joinclub/:club_id', clubController.joinClub);
router.get('/clubs', clubController.fetchClubByUserId);
router.get('/clubs/:club_id', clubController.getClubById);
router.get('/members/:club_id', clubController.fetchAllClubMembers);
router.delete('/remove/:user_club_id/:club_id', clubController.deleteClubMember);
router.get('/report/:club_id', clubController.dailyReport);

// router.post('/profileclub', authenticate, clubController.profileClub);
// router.post('/joinclub/:club_id',authenticate, clubController.joinClub);
// router.get('/clubs',authenticate, clubController.fetchClubByUserId);
// router.get('/clubs/:club_id',authenticate, clubController.getClubById);
// router.get('/members/:club_id',authenticate, clubController.fetchAllClubMembers);
// router.delete('/remove/:user_club_id/:club_id',authenticate, clubController.deleteClubMember);
// router.get('/report/:club_id', authenticate, clubController.dailyReport);

export default router;