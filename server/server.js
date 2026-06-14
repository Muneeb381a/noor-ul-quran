const express = require('express');
const cors = require('cors');
const https = require('https');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { port, clientUrl } = require('./config/env');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* Security headers */
app.use(helmet({ contentSecurityPolicy: false }));

/* Rate limiting — auth routes: 20 req/15min, general: 200 req/15min */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { error: 'Too many requests. Please try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors({ origin: clientUrl, credentials: true }));
app.use(express.json({ limit: '50kb' }));

app.use('/api/auth',     authLimiter, require('./routes/authRoutes'));
app.use('/api/hifz',     generalLimiter, require('./routes/hifzRoutes'));
app.use('/api/mistakes', generalLimiter, require('./routes/mistakeRoutes'));
app.use('/api/progress', generalLimiter, require('./routes/progressRoutes'));
app.use('/api/user',     generalLimiter, require('./routes/userRoutes'));

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Arabic TTS proxy — avoids CORS, works on all devices
app.get('/api/tts', rateLimit({ windowMs: 60000, max: 60 }), (req, res) => {
  const text = (req.query.text || req.query.q || '').slice(0, 500);
  if (!text) return res.status(400).json({ error: 'Missing text' });

  const encoded = encodeURIComponent(text.trim());
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=ar&client=gtx&ttsspeed=0.6`;

  https.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://translate.google.com/',
    },
  }, (response) => {
    if (response.statusCode !== 200) {
      return res.status(response.statusCode).json({ error: 'TTS upstream failed' });
    }
    res.set('Content-Type', 'audio/mpeg');
    res.set('Cache-Control', 'public, max-age=86400');
    response.pipe(res);
  }).on('error', (err) => res.status(500).json({ error: err.message }));
});

app.use(errorHandler);

// Local dev: start server. Vercel imports the exported app instead.
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;
