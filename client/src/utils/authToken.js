import jwt from 'jsonwebtoken';

const auth = {
  decodeToken(token) {
    let decoded = {};
    try {
      decoded = jwt.decode(token);
    } catch (error) {
      decoded = {
        error: error.message,
      };
    }
    return decoded;
  },

  validateToken(token) {
    if (!token) {
      return false;
    }
    const decoded = auth.decodeToken(token);
    
    if (token.error) {
      return false;
    }
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime || decoded.exp === undefined) {
      return false;
    }
    return decoded;
  },
};

export default auth;