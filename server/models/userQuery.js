const insertUser = `INSERT INTO users(email, name, password)
VALUES($1, $2, $3)
RETURNING id, email, name, registeredOn`;

const userDetails = "SELECT * FROM users WHERE email = $1";

export { insertUser, userDetails };
