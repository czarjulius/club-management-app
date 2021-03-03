import jwt from 'jsonwebtoken';

const generateToken = (id, email) => {
  const token = jwt.sign({
    id,
    email
  },
  process.env.SECRET_KEY, {
    expiresIn: '48h',
  });

  return token;
};

export default generateToken; 