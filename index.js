const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

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

const corsOptions = {
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
      return;
    }

    const normalizedOrigin = normalizeOrigin(origin);

    if (allowedOrigins.has(normalizedOrigin)) {
      callback(null, true);
      return;
    }

    if (/^http:\/\/localhost:\d+$/i.test(normalizedOrigin) || /^http:\/\/127\.0\.0\.1:\d+$/i.test(normalizedOrigin)) {
      callback(null, true);
      return;
    }

    if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(normalizedOrigin)) {
      callback(null, true);
      return;
    }

    console.warn(`CORS blocked for origin: ${origin}`);
    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
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
