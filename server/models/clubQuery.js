const createClub = `INSERT INTO clubs(name, admin_id)VALUES($1, $2)
                    RETURNING id, name, admin_id, registeredOn`;

const joinClub = `INSERT INTO user_club(user_id, club_id)VALUES($1, $2)`;

const getSingleClub = 'SELECT * FROM clubs WHERE name = $1';

const getSingleClubById = 'SELECT id, name, admin_id FROM clubs WHERE id = $1';

const checkUserInClub = 'SELECT * FROM user_club WHERE user_id = $1 AND club_id = $2';

const fetchUserClubsQuery = `SELECT B.name, B.id FROM user_club AS A   INNER
                            JOIN clubs as B   ON A.club_id=B.id where user_id = $1`

const fetchAllClubMembersQuery = `SELECT A.id AS user_club_id, B.name, B.id FROM user_club AS A   INNER
                                  JOIN users as B   ON A.user_id=B.id where club_id = $1` 
                                  
const deleteMember = `DELETE FROM user_club WHERE id = $1`

const dailyJoinCount = `Select count(distinct user_id) total, registeredon AS days from user_club where club_id = $1
                          group by registeredon`


export { 
  createClub, 
  getSingleClub, 
  joinClub, 
  checkUserInClub, 
  fetchUserClubsQuery, 
  fetchAllClubMembersQuery, 
  getSingleClubById,
  deleteMember,
  dailyJoinCount
};