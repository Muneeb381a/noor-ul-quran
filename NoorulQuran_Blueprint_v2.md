# 🕌 NoorulQuran — Complete Quranic Learning Platform
### Full Project Blueprint v2.0 | VS Code Ready | Open Source

---

## 🎯 MISSION STATEMENT

> "One platform for every Muslim — whether you're a beginner learning Alif Ba Ta, a student memorizing Quran, or someone wanting to understand duas in daily life."

**Platform Name:** NoorulQuran  
**Tagline:** Learn · Read · Memorize  
**License:** MIT (fully open source)  
**Tech Stack:** React + Vite · Node.js + Express · PostgreSQL  
**Language:** English (primary) · Urdu (secondary, switchable)  
**Target Users:**
- 🧒 Beginners — Qaida, Tajweed basics, pronunciation
- 📖 General users — Read Quran, translations, duas
- 🎓 Hifz students — Daily tracking, teacher feedback
- 👨‍🏫 Teachers — Manage students, mark mistakes
- 👨‍👩‍👦 Parents — Monitor child's progress

---

## 🔍 WHAT MAKES THIS DIFFERENT

| Feature | Quran.com | Tarteel | NoorulQuran |
|---|---|---|---|
| Qaida / Tajweed lessons | ❌ | ❌ | ✅ |
| Duas with pronunciation | ❌ | ❌ | ✅ |
| Hifz daily tracking | ❌ | ✅ (paid) | ✅ free |
| Teacher-Student system | ❌ | ❌ | ✅ |
| Sabaq/Sabaqi/Manzil system | ❌ | ❌ | ✅ |
| Urdu + English both | partial | ❌ | ✅ |
| 100% free, no ads | ✅ | ❌ | ✅ |
| Open source | ❌ | ❌ | ✅ |
| Works offline (PWA) | ✅ | ✅ | ✅ |

---

## 🗂️ COMPLETE FOLDER STRUCTURE

```
noorulquran/
│
├── client/                              # React + Vite Frontend
│   ├── public/
│   │   ├── index.html
│   │   ├── manifest.json                # PWA manifest
│   │   ├── sw.js                        # Service worker (offline)
│   │   └── assets/
│   │       ├── audio/                   # Qaida letter sounds (local)
│   │       └── images/
│   │
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   │
│   │   ├── assets/
│   │   │   └── fonts/
│   │   │       ├── NotoNaskhArabic.ttf  # Arabic display font
│   │   │       ├── JameelNoori.ttf      # Urdu font
│   │   │       └── Scheherazade.ttf     # Alternate Arabic
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx           # Top nav with module switcher
│   │   │   │   ├── Sidebar.jsx          # Context-aware sidebar
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── LanguageToggle.jsx   # EN ⇄ UR switcher
│   │   │   │
│   │   │   ├── quran/
│   │   │   │   ├── SurahList.jsx        # 114 surahs grid
│   │   │   │   ├── QuranReader.jsx      # Mushaf-style reader
│   │   │   │   ├── AyahCard.jsx         # Single ayah: Arabic + translation
│   │   │   │   ├── WordByWord.jsx       # Word-by-word translation
│   │   │   │   ├── AudioPlayer.jsx      # Recitation playback
│   │   │   │   ├── BookmarkBar.jsx      # Save position
│   │   │   │   └── TranslationToggle.jsx
│   │   │   │
│   │   │   ├── learn/                   # LEARNING MODULE
│   │   │   │   ├── qaida/
│   │   │   │   │   ├── QaidaHome.jsx    # Lesson list (30 lessons)
│   │   │   │   │   ├── LessonCard.jsx   # Individual lesson
│   │   │   │   │   ├── LetterGrid.jsx   # Arabic alphabet grid
│   │   │   │   │   ├── PronounceBtn.jsx # Tap to hear sound
│   │   │   │   │   └── QaidaQuiz.jsx    # Simple letter quiz
│   │   │   │   │
│   │   │   │   ├── tajweed/
│   │   │   │   │   ├── TajweedHome.jsx  # Rules list
│   │   │   │   │   ├── RuleCard.jsx     # Rule + example ayah
│   │   │   │   │   ├── ColorCoded.jsx   # Tajweed color highlights
│   │   │   │   │   └── RuleQuiz.jsx
│   │   │   │   │
│   │   │   │   └── duas/
│   │   │   │       ├── DuaHome.jsx      # Categories grid
│   │   │   │       ├── DuaCard.jsx      # Arabic + translation + audio
│   │   │   │       ├── DuaSearch.jsx    # Search by keyword
│   │   │   │       └── DuaFavorites.jsx
│   │   │   │
│   │   │   ├── hifz/                    # HIFZ MODULE
│   │   │   │   ├── DailyLogForm.jsx     # Aaj ka sabaq entry
│   │   │   │   ├── LogTypeSelector.jsx  # Sabaq/Sabaqi/Manzil/Dhor
│   │   │   │   ├── AyahRangePicker.jsx  # From Surah:Ayah → To Surah:Ayah
│   │   │   │   ├── QualityRating.jsx    # 1–5 star self-rating
│   │   │   │   ├── MistakeMarker.jsx    # Mark mistakes on specific ayah
│   │   │   │   ├── RevisionCalendar.jsx # Upcoming revision schedule
│   │   │   │   └── StreakBadge.jsx      # 🔥 Daily streak counter
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── StudentDash.jsx      # Student home
│   │   │   │   ├── TeacherDash.jsx      # Teacher: all students overview
│   │   │   │   ├── ParentDash.jsx       # Parent: child progress
│   │   │   │   ├── ProgressChart.jsx    # Recharts: hifz progress
│   │   │   │   ├── WeeklyReport.jsx     # 7-day summary
│   │   │   │   └── SurahProgressMap.jsx # Visual: 114 surahs grid colored
│   │   │   │
│   │   │   └── ui/
│   │   │       ├── Button.jsx
│   │   │       ├── Modal.jsx
│   │   │       ├── Toast.jsx
│   │   │       ├── Loader.jsx
│   │   │       ├── Badge.jsx
│   │   │       └── ArabicText.jsx       # RTL Arabic wrapper component
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx                 # Landing / module selection
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   │
│   │   │   ├── learn/
│   │   │   │   ├── LearnHome.jsx        # Learn module entry
│   │   │   │   ├── QaidaPage.jsx
│   │   │   │   ├── TajweedPage.jsx
│   │   │   │   └── DuasPage.jsx
│   │   │   │
│   │   │   ├── quran/
│   │   │   │   ├── QuranHome.jsx        # Surah list
│   │   │   │   └── SurahPage.jsx        # Individual surah reader
│   │   │   │
│   │   │   ├── hifz/
│   │   │   │   ├── HifzHome.jsx
│   │   │   │   ├── NewLog.jsx
│   │   │   │   └── MistakesPage.jsx
│   │   │   │
│   │   │   └── dashboard/
│   │   │       ├── StudentDashboard.jsx
│   │   │       ├── TeacherDashboard.jsx
│   │   │       └── ParentDashboard.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── AuthContext.jsx          # User auth state
│   │   │   ├── HifzContext.jsx          # Hifz logs state
│   │   │   └── LanguageContext.jsx      # EN/UR toggle
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useQuran.js              # Fetch surah/ayah data
│   │   │   ├── useAudio.js              # Play/pause audio
│   │   │   ├── useStreak.js             # Streak calculation
│   │   │   └── useOffline.js            # PWA offline detection
│   │   │
│   │   ├── services/
│   │   │   ├── api.js                   # Axios instance + interceptors
│   │   │   ├── quranService.js          # alquran.cloud API calls
│   │   │   ├── hifzService.js           # Hifz log CRUD
│   │   │   └── duaService.js            # Local duas data
│   │   │
│   │   ├── data/                        # LOCAL static data (no API needed)
│   │   │   ├── qaida-lessons.json       # 30 Qaida lessons structured
│   │   │   ├── tajweed-rules.json       # Tajweed rules + examples
│   │   │   ├── duas.json                # 200+ duas with categories
│   │   │   └── arabic-letters.json      # Alphabet with sounds
│   │   │
│   │   ├── i18n/                        # Translations
│   │   │   ├── en.json                  # English strings
│   │   │   └── ur.json                  # Urdu strings
│   │   │
│   │   ├── styles/
│   │   │   ├── global.css
│   │   │   ├── variables.css
│   │   │   ├── arabic.css               # RTL, Arabic font sizing
│   │   │   └── themes/
│   │   │       ├── light.css
│   │   │       └── dark.css
│   │   │
│   │   └── utils/
│   │       ├── quranHelpers.js          # Surah/Ayah number utils
│   │       ├── spacedRepetition.js      # Revision date calculator
│   │       └── dateHelpers.js
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/                              # Node.js + Express Backend
│   ├── server.js                        # Entry point
│   │
│   ├── config/
│   │   ├── db.js                        # pg Pool connection
│   │   └── env.js
│   │
│   ├── database/
│   │   ├── schema.sql                   # All CREATE TABLE statements
│   │   └── seed.sql                     # Sample data (optional)
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js            # JWT verification
│   │   ├── roleMiddleware.js            # student/teacher/parent guard
│   │   └── errorHandler.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── hifzController.js
│   │   ├── mistakeController.js
│   │   ├── userController.js
│   │   └── progressController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── hifzRoutes.js
│   │   ├── mistakeRoutes.js
│   │   ├── userRoutes.js
│   │   └── progressRoutes.js
│   │
│   ├── models/                          # Raw SQL query functions
│   │   ├── User.js
│   │   ├── HifzLog.js
│   │   ├── Mistake.js
│   │   ├── Progress.js
│   │   └── Streak.js
│   │
│   └── package.json
│
├── .env.example
├── .gitignore
├── README.md
└── LICENSE                              # MIT License
```

---

## 🗄️ DATABASE SCHEMA (PostgreSQL)

```sql
-- =============================================
-- NoorulQuran — schema.sql
-- =============================================

-- USERS
CREATE TABLE users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(100) NOT NULL,
  email         VARCHAR(150) UNIQUE NOT NULL,
  password      VARCHAR(255) NOT NULL,
  role          VARCHAR(20)  NOT NULL CHECK (role IN ('student','teacher','parent','guest')),
  language_pref VARCHAR(5)   DEFAULT 'en',
  theme         VARCHAR(10)  DEFAULT 'light',
  created_at    TIMESTAMP    DEFAULT NOW()
);

-- TEACHER ↔ STUDENT LINK
CREATE TABLE teacher_students (
  id          SERIAL PRIMARY KEY,
  teacher_id  INT REFERENCES users(id) ON DELETE CASCADE,
  student_id  INT REFERENCES users(id) ON DELETE CASCADE,
  invite_code VARCHAR(20),
  joined_at   TIMESTAMP DEFAULT NOW(),
  UNIQUE(teacher_id, student_id)
);

-- PARENT ↔ CHILD LINK
CREATE TABLE parent_children (
  id         SERIAL PRIMARY KEY,
  parent_id  INT REFERENCES users(id) ON DELETE CASCADE,
  child_id   INT REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(parent_id, child_id)
);

-- DAILY HIFZ LOG
CREATE TABLE hifz_logs (
  id            SERIAL PRIMARY KEY,
  student_id    INT REFERENCES users(id) ON DELETE CASCADE,
  log_date      DATE    NOT NULL DEFAULT CURRENT_DATE,
  log_type      VARCHAR(20) NOT NULL
                CHECK (log_type IN ('sabaq','sabaqi','manzil','dhor')),
  surah_start   SMALLINT NOT NULL,       -- 1–114
  ayah_start    SMALLINT NOT NULL,
  surah_end     SMALLINT NOT NULL,
  ayah_end      SMALLINT NOT NULL,
  quality       SMALLINT CHECK (quality BETWEEN 1 AND 5),
  duration_min  SMALLINT,
  teacher_note  TEXT,
  created_at    TIMESTAMP DEFAULT NOW()
);

-- LOG TYPE KEY:
-- sabaq    = new lesson today
-- sabaqi   = yesterday's lesson revised
-- manzil   = weekly portion revised
-- dhor     = full revision cycle

-- MISTAKES PER AYAH
CREATE TABLE mistakes (
  id            SERIAL PRIMARY KEY,
  student_id    INT REFERENCES users(id) ON DELETE CASCADE,
  log_id        INT REFERENCES hifz_logs(id) ON DELETE CASCADE,
  surah_num     SMALLINT NOT NULL,
  ayah_num      SMALLINT NOT NULL,
  mistake_type  VARCHAR(30) CHECK (
                  mistake_type IN ('word','tashkeel','tajweed','sequence','skip')
                ),
  description   TEXT,
  resolved      BOOLEAN  DEFAULT FALSE,
  marked_by     INT REFERENCES users(id),
  created_at    TIMESTAMP DEFAULT NOW()
);

-- HIFZ PROGRESS (per student per surah)
CREATE TABLE hifz_progress (
  id              SERIAL PRIMARY KEY,
  student_id      INT REFERENCES users(id) ON DELETE CASCADE,
  surah_num       SMALLINT NOT NULL,
  memorized_pct   SMALLINT DEFAULT 0,   -- 0 to 100
  status          VARCHAR(20) DEFAULT 'not_started'
                  CHECK (status IN ('not_started','in_progress','memorized','needs_revision')),
  last_revised    DATE,
  UNIQUE(student_id, surah_num)
);

-- STREAKS
CREATE TABLE streaks (
  id              SERIAL PRIMARY KEY,
  student_id      INT REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  current_streak  INT  DEFAULT 0,
  longest_streak  INT  DEFAULT 0,
  last_log_date   DATE
);

-- BOOKMARKS (Quran reader)
CREATE TABLE bookmarks (
  id          SERIAL PRIMARY KEY,
  user_id     INT REFERENCES users(id) ON DELETE CASCADE,
  surah_num   SMALLINT NOT NULL,
  ayah_num    SMALLINT NOT NULL,
  label       VARCHAR(100),
  created_at  TIMESTAMP DEFAULT NOW()
);

-- DUA FAVORITES
CREATE TABLE dua_favorites (
  id        SERIAL PRIMARY KEY,
  user_id   INT REFERENCES users(id) ON DELETE CASCADE,
  dua_id    VARCHAR(50) NOT NULL,          -- matches duas.json id field
  UNIQUE(user_id, dua_id)
);

-- QAIDA LESSON PROGRESS (for beginners)
CREATE TABLE qaida_progress (
  id          SERIAL PRIMARY KEY,
  user_id     INT REFERENCES users(id) ON DELETE CASCADE,
  lesson_num  SMALLINT NOT NULL,           -- 1–30
  completed   BOOLEAN DEFAULT FALSE,
  score       SMALLINT,                    -- Quiz score %
  completed_at TIMESTAMP,
  UNIQUE(user_id, lesson_num)
);
```

---

## 🌐 API ENDPOINTS

```
AUTH
  POST  /api/auth/register              Register new user (any role)
  POST  /api/auth/login                 Login → JWT
  GET   /api/auth/me                    Current user info
  POST  /api/auth/invite                Teacher generates invite code

HIFZ LOGS
  GET   /api/hifz/logs                  Student: own logs (paginated)
  POST  /api/hifz/logs                  Create new daily log
  PUT   /api/hifz/logs/:id              Update log (teacher adds note)
  DELETE /api/hifz/logs/:id

PROGRESS
  GET   /api/progress                   Full progress (all 114 surahs)
  GET   /api/progress/:surahNum         Specific surah status
  PUT   /api/progress/:surahNum         Update surah status
  GET   /api/progress/streak            Current + longest streak

MISTAKES
  GET   /api/mistakes                   All mistakes (filter: surah, resolved)
  POST  /api/mistakes                   Log new mistake
  PUT   /api/mistakes/:id/resolve       Mark resolved ✓

TEACHER (role: teacher)
  GET   /api/teacher/students           My student list
  GET   /api/teacher/student/:id/logs   Specific student logs
  GET   /api/teacher/student/:id/mistakes
  PUT   /api/teacher/log/:id/feedback   Add feedback to log

PARENT (role: parent)
  GET   /api/parent/children            My children list
  GET   /api/parent/child/:id/summary   Weekly summary
  GET   /api/parent/child/:id/streak

USER
  GET   /api/user/profile               Profile info
  PUT   /api/user/profile               Update name, language, theme
  GET   /api/user/bookmarks             Saved ayahs
  POST  /api/user/bookmarks             Add bookmark
  DELETE /api/user/bookmarks/:id
  GET   /api/user/dua-favorites         Saved duas
  POST  /api/user/dua-favorites         Add dua to favorites
  DELETE /api/user/dua-favorites/:duaId

QAIDA
  GET   /api/qaida/progress             All 30 lessons progress
  PUT   /api/qaida/progress/:lessonNum  Mark lesson complete + score
```

---

## 📡 FREE EXTERNAL APIs

```
QURAN TEXT + TRANSLATION
  Base: https://api.alquran.cloud/v1

  GET /surah                            → All 114 surahs list
  GET /surah/2                          → Al-Baqarah (Arabic)
  GET /surah/2/en.sahih                 → English translation
  GET /surah/2/ur.jalandhry             → Urdu translation (Jalandhri)
  GET /ayah/2:255                       → Ayatul Kursi specifically

AUDIO RECITATION
  Mishary Alafasy (most popular):
  https://cdn.islamic.network/quran/audio/128/ar.alafasy/{ayah_number}.mp3

  Husary:
  https://cdn.islamic.network/quran/audio/128/ar.husary/{ayah_number}.mp3

  Full surah:
  https://download.quranicaudio.com/quran/mishaari_raashid_al_3afaasee/{surahNum}.mp3

WORD BY WORD (Quran.com API)
  https://api.quran.com/api/v4/verses/by_chapter/{surahNum}?words=true
```

---

## 📚 LEARNING MODULE — Data Structure

### Qaida Lessons (src/data/qaida-lessons.json)
```json
[
  {
    "id": 1,
    "title": "Arabic Alphabet — Isolated Letters",
    "urdu_title": "حروف تہجی",
    "description": "Learn all 28 Arabic letters in isolated form",
    "letters": [
      {
        "arabic": "ا",
        "name": "Alif",
        "urdu_name": "الف",
        "sound": "a",
        "audio": "/assets/audio/alif.mp3",
        "example_word": "أَسَد",
        "example_meaning": "Lion"
      }
    ],
    "quiz": true
  },
  {
    "id": 2,
    "title": "Connected Letters — Beginning Form",
    "letters": []
  }
]
```

### Duas (src/data/duas.json)
```json
[
  {
    "id": "dua_eating",
    "category": "Daily Life",
    "subcategory": "Food",
    "title": "Before Eating",
    "arabic": "بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ",
    "transliteration": "Bismillaahi wa 'alaa barakatillaah",
    "translation_en": "In the name of Allah and with the blessings of Allah",
    "translation_ur": "اللہ کے نام سے اور اللہ کی برکت پر",
    "source": "Abu Dawud",
    "audio": "cdn_url_or_local"
  }
]
```

### Tajweed Rules (src/data/tajweed-rules.json)
```json
[
  {
    "id": "ghunnah",
    "name": "Ghunnah",
    "arabic_name": "غُنَّة",
    "color": "#4CAF50",
    "description": "Nasal sound held for 2 counts — on noon/meem with shaddah",
    "example_ayah": { "surah": 1, "ayah": 2 },
    "highlight_word": 1
  }
]
```

---

## 🔄 SPACED REPETITION LOGIC

```js
// utils/spacedRepetition.js
// Based on traditional hifz method (not Anki algorithm)

const REVISION_SCHEDULE = {
  sabaq:   [1, 3, 7],       // New lesson: revise after 1, 3, 7 days
  sabaqi:  [7, 14],         // Previous lesson: revise after 7, 14 days
  manzil:  [30, 90],        // Weekly portion: revise after 30, 90 days
};

export function getNextRevisionDates(logType, logDate) {
  const days = REVISION_SCHEDULE[logType] || [];
  return days.map(d => {
    const date = new Date(logDate);
    date.setDate(date.getDate() + d);
    return date.toISOString().split('T')[0];
  });
}

export function getDueRevisions(allLogs, today) {
  // Returns logs that are due for revision today
  return allLogs.filter(log => {
    const nextDates = getNextRevisionDates(log.log_type, log.log_date);
    return nextDates.includes(today);
  });
}
```

---

## 🎨 DESIGN SYSTEM

```css
/* styles/variables.css */
:root {
  /* Colors */
  --green-deep:    #1B4332;   /* Primary — Islamic green */
  --green-mid:     #2D6A4F;
  --green-light:   #52B788;
  --gold:          #C9A84C;   /* Accent — gold */
  --gold-light:    #E9C46A;
  --cream:         #FDF6EC;   /* Background — warm mushaf */
  --cream-dark:    #F0E8D8;
  --text-dark:     #1A1A1A;
  --text-mid:      #4A4A4A;
  --danger:        #C0392B;   /* Mistake markers */
  --success:       #27AE60;

  /* Typography */
  --font-arabic:   'Noto Naskh Arabic', 'Scheherazade New', serif;
  --font-urdu:     'Jameel Noori Nastaleeq', serif;
  --font-body:     'Lato', 'Source Sans 3', sans-serif;
  --font-heading:  'Playfair Display', serif;

  /* Arabic text sizes */
  --arabic-sm:     20px;
  --arabic-md:     26px;
  --arabic-lg:     32px;
  --arabic-xl:     40px;

  /* Spacing */
  --radius:        8px;
  --radius-lg:     16px;
}

/* Dark mode */
[data-theme="dark"] {
  --cream:      #1A1A2E;
  --cream-dark: #16213E;
  --text-dark:  #E8E8E8;
}
```

---

## 📱 ROUTING STRUCTURE (React Router)

```jsx
// App.jsx
<Routes>
  <Route path="/"               element={<Home />} />
  <Route path="/login"          element={<Login />} />
  <Route path="/register"       element={<Register />} />

  {/* LEARN MODULE — No login required */}
  <Route path="/learn"          element={<LearnHome />} />
  <Route path="/learn/qaida"    element={<QaidaPage />} />
  <Route path="/learn/tajweed"  element={<TajweedPage />} />
  <Route path="/learn/duas"     element={<DuasPage />} />

  {/* QURAN READER — No login required */}
  <Route path="/quran"          element={<QuranHome />} />
  <Route path="/quran/:surahNum" element={<SurahPage />} />

  {/* HIFZ MODULE — Login required */}
  <Route element={<PrivateRoute />}>
    <Route path="/hifz"         element={<HifzHome />} />
    <Route path="/hifz/new-log" element={<NewLog />} />
    <Route path="/hifz/mistakes" element={<MistakesPage />} />
  </Route>

  {/* DASHBOARDS — Role-based */}
  <Route element={<PrivateRoute role="student" />}>
    <Route path="/dashboard"    element={<StudentDashboard />} />
  </Route>
  <Route element={<PrivateRoute role="teacher" />}>
    <Route path="/teacher"      element={<TeacherDashboard />} />
  </Route>
  <Route element={<PrivateRoute role="parent" />}>
    <Route path="/parent"       element={<ParentDashboard />} />
  </Route>
</Routes>
```

---

## 📦 ALL PACKAGES

**Frontend:**
```bash
npm create vite@latest client -- --template react
cd client
npm install react-router-dom axios
npm install @tanstack/react-query        # Server state management
npm install react-hot-toast              # Notifications
npm install recharts                     # Progress charts
npm install date-fns                     # Date utilities
npm install i18next react-i18next        # EN/UR translations
npm install react-audio-player           # Audio recitation
```

**Backend:**
```bash
cd server && npm init -y
npm install express pg cors dotenv
npm install bcryptjs jsonwebtoken
npm install express-validator            # Input validation
npm install --save-dev nodemon
```

---

## 🔐 ENVIRONMENT VARIABLES

```env
# server/.env

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=noorulquran
DB_USER=postgres
DB_PASS=yourpassword

# Auth
JWT_SECRET=generate_a_long_random_string_here
JWT_EXPIRES=7d

# Server
PORT=5000
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🚀 SETUP COMMANDS (VS Code Terminal)

```bash
# ── Step 1: Clone / Create Project ──────────────────
mkdir noorulquran && cd noorulquran

# ── Step 2: Backend ─────────────────────────────────
mkdir server && cd server
npm init -y
npm install express pg cors dotenv bcryptjs jsonwebtoken express-validator
npm install --save-dev nodemon

# Add to package.json scripts:
# "dev": "nodemon server.js"

cd ..

# ── Step 3: Frontend ─────────────────────────────────
npm create vite@latest client -- --template react
cd client
npm install react-router-dom axios @tanstack/react-query
npm install react-hot-toast recharts date-fns
npm install i18next react-i18next react-audio-player

cd ..

# ── Step 4: PostgreSQL ───────────────────────────────
psql -U postgres -c "CREATE DATABASE noorulquran;"
psql -U postgres -d noorulquran -f server/database/schema.sql

# ── Step 5: Run Both ─────────────────────────────────
# VS Code: Open 2 terminals

# Terminal 1 — Backend:
cd server && npm run dev
# Runs on: http://localhost:5000

# Terminal 2 — Frontend:
cd client && npm run dev
# Runs on: http://localhost:5173
```

---

## 📅 DEVELOPMENT PHASES

### ✅ Phase 1 — Foundation (Week 1–2)
```
□ Project setup (Vite + Express + PostgreSQL)
□ Auth system (register/login/JWT)
□ Basic routing structure
□ Design system (CSS variables, fonts)
□ Surah list page (from alquran.cloud)
□ Basic Quran reader (Arabic + English)
□ Audio playback per ayah
```

### ✅ Phase 2 — Learn Module (Week 3–4)
```
□ Qaida lessons (30 lessons, static JSON)
□ Arabic letter pronunciation (audio)
□ Letter quiz (tap correct letter)
□ Tajweed rules page (color-coded)
□ Duas page (categories + search)
□ Dua favorites (local storage first)
□ EN ⇄ UR language toggle
```

### ✅ Phase 3 — Hifz Module (Week 5–6)
```
□ Daily log form (Sabaq/Sabaqi/Manzil/Dhor)
□ Ayah range picker
□ Quality rating + notes
□ Progress per surah (visual grid)
□ Streak tracker
□ Revision calendar (due today)
□ Mistake log per ayah
```

### ✅ Phase 4 — Teacher + Parent (Week 7–8)
```
□ Teacher dashboard
□ Invite code system (teacher links student)
□ Teacher reviews student logs
□ Teacher marks mistakes + feedback
□ Parent dashboard
□ Parent links to child account
□ Weekly PDF report (optional)
□ PWA setup (installable, offline)
```

---

## 🌍 OPEN SOURCE PLAN

```
GitHub Repository: github.com/yourusername/noorulquran
License:           MIT
README:            Setup guide + contribution guide
Issues:            Feature requests + bug reports
Contributing:      Welcoming community duas data, translations
```

---

*NoorulQuran Blueprint v2.0*
*Stack: React · Node.js · PostgreSQL | Open Source MIT*
