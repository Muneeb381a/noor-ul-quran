const pool = require('../config/db');

const User = {
  findByEmail: (email) => pool.query('SELECT * FROM users WHERE email = $1', [email]),
  findById: (id) => pool.query('SELECT id,name,email,role,language_pref,theme,created_at FROM users WHERE id = $1', [id]),
  create: ({ name, email, password, role }) =>
    pool.query(
      'INSERT INTO users (name,email,password,role) VALUES ($1,$2,$3,$4) RETURNING id,name,email,role',
      [name, email, password, role]
    ),
  update: (id, fields) => {
    const keys = Object.keys(fields);
    const values = Object.values(fields);
    const set = keys.map((k, i) => `${k}=$${i + 1}`).join(',');
    return pool.query(`UPDATE users SET ${set} WHERE id=$${keys.length + 1} RETURNING id,name,email,role,language_pref,theme`, [...values, id]);
  },
};

module.exports = User;
