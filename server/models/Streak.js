const pool = require('../config/db');

const Streak = {
  findByStudent: (studentId) =>
    pool.query('SELECT * FROM streaks WHERE student_id=$1', [studentId]),
  upsert: (studentId, currentStreak, longestStreak, lastLogDate) =>
    pool.query(
      `INSERT INTO streaks (student_id,current_streak,longest_streak,last_log_date)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (student_id) DO UPDATE
       SET current_streak=$2, longest_streak=$3, last_log_date=$4 RETURNING *`,
      [studentId, currentStreak, longestStreak, lastLogDate]
    ),
};

module.exports = Streak;
