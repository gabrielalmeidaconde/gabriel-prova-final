require('dotenv').config();
const express = require('express');
const cors = require('cors');
const coursesRouter = require('./routes/courses');

const app = express();

app.use(cors({
  origin: (origin, cb) => {
    if (
      !origin ||
      origin === process.env.FRONTEND_URL ||
      origin === 'http://localhost:5173' ||
      /^https:\/\/.*\.vercel\.app$/.test(origin)
    ) {
      cb(null, true);
    } else {
      cb(new Error('CORS não permitido'));
    }
  },
}));
app.use(express.json());

app.use('/courses', coursesRouter);

app.get('/health', (_req, res) => res.json({ status: 'ok', version: '1.0.0' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
