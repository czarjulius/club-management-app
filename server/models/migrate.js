/* eslint-disable consistent-return */
import pool from './db';
import bcrypt from "bcryptjs";

const tableQuery = async () => {
  try {
    const dropClubTable = await pool.query('DROP TABLE IF EXISTS clubs CASCADE;');
    const dropUserClubTable = await pool.query('DROP TABLE IF EXISTS user_club CASCADE;');
    const dropUserTable = await pool.query('DROP TABLE IF EXISTS users CASCADE;');
    const dropInvitationsTable = await pool.query('DROP TABLE IF EXISTS invitations CASCADE;');

    const userTable = await pool.query(`CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50),
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(200),
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP )`);

    const clubTable = await pool.query(`CREATE TABLE IF NOT EXISTS clubs(
      id SERIAL PRIMARY KEY,
      name VARCHAR(50) UNIQUE NOT NULL,
      admin_id INTEGER,
      FOREIGN KEY (admin_id) REFERENCES users(id),
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP )`);
      
    const userClubTable = await pool.query(`CREATE TABLE IF NOT EXISTS user_club(
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      club_id INTEGER,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (club_id) REFERENCES clubs(id),
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP )`);

    const invitationsTable = await pool.query(`CREATE TABLE IF NOT EXISTS invitations(
      id SERIAL PRIMARY KEY,
      sender_email  VARCHAR(50),
      invitee_email  VARCHAR(50),
      club_id INTEGER,
      FOREIGN KEY (sender_email) REFERENCES users(email),
      FOREIGN KEY (invitee_email) REFERENCES users(email),
      FOREIGN KEY (club_id) REFERENCES clubs(id),
      status VARCHAR(10) DEFAULT 'pending',
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP )`);
        

      const usersValues = ['Julius Ngwu', 'admin@gmail.com', bcrypt.hashSync('j@1', 10)];
        const usersQuery = await pool.query('INSERT into users(name, email, password)VALUES($1,$2, $3)', usersValues);

      const clubValues = ['man city', 1];
        const clubQuery = await pool.query('INSERT into clubs(name,admin_id)VALUES($1,$2)', clubValues);

    console.log('All Tables Created Successfully');
  } catch (err) {
    console.log(err.stack);
    return err.stack;
  }
};

tableQuery();