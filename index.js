const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

const defaultAllowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4200',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
  'http://127.0.0.1:4200',
  'http://127.0.0.1:5173'
];

const normalizeOrigin = (origin) => origin.replace(/\/+$/, '').toLowerCase();

const envAllowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
      .map((origin) => origin.trim())
      .filter(Boolean)
      .map(normalizeOrigin)
  : [];

const allowedOrigins = new Set([
  ...defaultAllowedOrigins.map(normalizeOrigin),
  ...envAllowedOrigins
]);

const isOriginAllowed = (origin) => {
  const normalizedOrigin = normalizeOrigin(origin);

  if (allowedOrigins.has(normalizedOrigin)) {
    return true;
  }

  if (/^http:\/\/localhost:\d+$/i.test(normalizedOrigin) || /^http:\/\/127\.0\.0\.1:\d+$/i.test(normalizedOrigin)) {
    return true;
  }

  if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(normalizedOrigin)) {
    return true;
  }

  return false;
};

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (!origin) {
    if (req.method === 'OPTIONS') {
      return res.sendStatus(204);
    }
    return next();
  }

  if (!isOriginAllowed(origin)) {
    console.warn(`CORS blocked for origin: ${origin}`);
    return res.status(403).json({ message: `CORS blocked for origin: ${origin}` });
  }

  res.header('Access-Control-Allow-Origin', origin);
  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.header(
    'Access-Control-Allow-Headers',
    req.headers['access-control-request-headers'] || 'Content-Type, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

const productRoute = require('./src/routes/product.route.js');
const authRoute = require('./src/routes/auth.route.js');
const userRoute = require('./src/routes/user.route.js');

app.get('/', (req, res) => {
  res.send('Hello World! port 3000');
});

app.use('/api/auth', authRoute);
app.use('/api/products', productRoute);
app.use('/api/users', userRoute);

mongoose
  .connect(
    'mongodb+srv://admin:iVYiVRUCKKksRm6A@kushandb.vwqpm.mongodb.net/Node-API?retryWrites=true&w=majority&appName=KushanDb'
  )
  .then(() => {
    console.info('Connected MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => console.log('Connection Failed'));
