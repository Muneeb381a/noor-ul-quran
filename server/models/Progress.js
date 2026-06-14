const pool = require('../config/db');

const Progress = {
  findByStudent: (studentId) =>
    pool.query('SELECT * FROM hifz_progress WHERE student_id=$1 ORDER BY surah_num', [studentId]),
  findBySurah: (studentId, surahNum) =>
    pool.query('SELECT * FROM hifz_progress WHERE student_id=$1 AND surah_num=$2', [studentId, surahNum]),
  upsert: (studentId, surahNum, fields) => {
    const { memorized_pct, status, last_revised } = fields;
    return pool.query(
      `INSERT INTO hifz_progress (student_id,surah_num,memorized_pct,status,last_revised)
       VALUES ($1,$2,$3,$4,$5)
       ON CONFLICT (student_id,surah_num) DO UPDATE
       SET memorized_pct=$3, status=$4, last_revised=$5 RETURNING *`,
      [studentId, surahNum, memorized_pct, status, last_revised]
    );
  },
};

module.exports = Progress;
