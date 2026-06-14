-- NoorulQuran — schema.sql

CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) UNIQUE NOT NULL,
  password      VARCHAR(255) NOT NULL,
  role          VARCHAR(20)  NOT NULL CHECK (role IN ('student','teacher','parent','guest')),
  language_pref VARCHAR(5)   DEFAULT 'en',
  theme         VARCHAR(10)  DEFAULT 'light',
  created_at    TIMESTAMP    DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS teacher_students (
  id          SERIAL PRIMARY KEY,
  teacher_id  INT REFERENCES users(id) ON DELETE CASCADE,
  student_id  INT REFERENCES users(id) ON DELETE CASCADE,
  invite_code VARCHAR(20),
  joined_at   TIMESTAMP DEFAULT NOW(),
  UNIQUE(teacher_id, student_id)
);

CREATE TABLE IF NOT EXISTS parent_children (
  id         SERIAL PRIMARY KEY,
  parent_id  INT REFERENCES users(id) ON DELETE CASCADE,
  child_id   INT REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(parent_id, child_id)
);

CREATE TABLE IF NOT EXISTS hifz_logs (
  id            SERIAL PRIMARY KEY,
  student_id    INT REFERENCES users(id) ON DELETE CASCADE,
  log_date      DATE    NOT NULL DEFAULT CURRENT_DATE,
  log_type      VARCHAR(20) NOT NULL CHECK (log_type IN ('sabaq','sabaqi','manzil','dhor')),
  surah_start   SMALLINT NOT NULL,
  ayah_start    SMALLINT NOT NULL,
  surah_end     SMALLINT NOT NULL,
  ayah_end      SMALLINT NOT NULL,
  quality       SMALLINT CHECK (quality BETWEEN 1 AND 5),
  duration_min  SMALLINT,
  teacher_note  TEXT,
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mistakes (
  id            SERIAL PRIMARY KEY,
  student_id    INT REFERENCES users(id) ON DELETE CASCADE,
  log_id        INT REFERENCES hifz_logs(id) ON DELETE CASCADE,
  surah_num     SMALLINT NOT NULL,
  ayah_num      SMALLINT NOT NULL,
  mistake_type  VARCHAR(30) CHECK (mistake_type IN ('word','tashkeel','tajweed','sequence','skip')),
  description   TEXT,
  resolved      BOOLEAN  DEFAULT FALSE,
  marked_by     INT REFERENCES users(id),
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hifz_progress (
  id              SERIAL PRIMARY KEY,
  student_id      INT REFERENCES users(id) ON DELETE CASCADE,
  surah_num       SMALLINT NOT NULL,
  memorized_pct   SMALLINT DEFAULT 0,
  status          VARCHAR(20) DEFAULT 'not_started'
                  CHECK (status IN ('not_started','in_progress','memorized','needs_revision')),
  last_revised    DATE,
  UNIQUE(student_id, surah_num)
);

CREATE TABLE IF NOT EXISTS streaks (
  id              SERIAL PRIMARY KEY,
  student_id      INT REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  current_streak  INT  DEFAULT 0,
  longest_streak  INT  DEFAULT 0,
  last_log_date   DATE
);

CREATE TABLE IF NOT EXISTS bookmarks (
  id          SERIAL PRIMARY KEY,
  user_id     INT REFERENCES users(id) ON DELETE CASCADE,
  surah_num   SMALLINT NOT NULL,
  ayah_num    SMALLINT NOT NULL,
  label       VARCHAR(100),
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dua_favorites (
  id        SERIAL PRIMARY KEY,
  user_id   INT REFERENCES users(id) ON DELETE CASCADE,
  dua_id    VARCHAR(50) NOT NULL,
  UNIQUE(user_id, dua_id)
);

CREATE TABLE IF NOT EXISTS qaida_progress (
  id           SERIAL PRIMARY KEY,
  user_id      INT REFERENCES users(id) ON DELETE CASCADE,
  lesson_num   SMALLINT NOT NULL,
  completed    BOOLEAN DEFAULT FALSE,
  score        SMALLINT,
  completed_at TIMESTAMP,
  UNIQUE(user_id, lesson_num)
);
