const sendInvite = `INSERT INTO invitations(sender_email, invitee_email, club_id)
VALUES($1, $2, $3)
RETURNING id, sender_email, invitee_email, club_id, registeredOn`;

 const fetchUserPendingInvites = `SELECT A.id, B.name AS sender, B.id AS sender_id, C.name As club, C.id AS club_id 
                                    FROM invitations AS A
                                    INNER JOIN users AS B ON A.sender_email=B.email 
                                    INNER JOIN clubs C ON (A.club_id =  C.id) 
                                    WHERE A.invitee_email = $1 AND A.status = 'pending'`

  const updateInvite = `UPDATE invitations SET status = $1 WHERE id = $2`

export { sendInvite, fetchUserPendingInvites, updateInvite};