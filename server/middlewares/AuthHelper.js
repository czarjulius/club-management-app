import db from '../models/db';

class AuthenticationHelper {
  static async getAuthUser(id) {
    const query = `SELECT 
        id, 
        name, 
        email,
        registeredon
        FROM users WHERE id = $1`;
    const { rows } = await db.query(query, [id]);    
    return rows[0];  
  }
}

export default AuthenticationHelper;