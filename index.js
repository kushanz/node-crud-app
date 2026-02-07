const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); // Add this line
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();

// CORS configuration
// const corsOptions = {
//   origin: 'http://localhost:3001',
  // origin: function (origin, callback) {
  //   // Allow requests with no origin (like mobile apps, Postman, etc.)
  //   if (!origin) return callback(null, true);
    
  //   // In development, allow all localhost origins
  //   if (process.env.NODE_ENV !== 'production') {
  //     const allowedOrigins = [
  //       'http://localhost:3000',
  //       'http://localhost:3001',
  //       'http://localhost:5173', // Vite default
  //       'http://localhost:8080',
  //       'http://127.0.0.1:3000',
  //       'http://127.0.0.1:5173',
  //       'http://127.0.0.1:8080'
  //     ];
      
  //     if (allowedOrigins.indexOf(origin) !== -1) {
  //       return callback(null, true);
  //     }
  //   }
    
  //   // In production, only allow specific domains
  //   const productionOrigins = process.env.ALLOWED_ORIGINS 
  //     ? process.env.ALLOWED_ORIGINS.split(',')
  //     : [];
    
  //   if (productionOrigins.indexOf(origin) !== -1) {
  //     callback(null, true);
  //   } else {
  //     console.log(`CORS blocked origin: ${origin}`);
  //     callback(new Error('Not allowed by CORS'));
  //   }
  // },
//   credentials: true, // Allow cookies and authorization headers
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
//   optionsSuccessStatus: 200 // For legacy browser support
// };

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') 
    : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions)); // Enable CORS with custom options
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

const productRoute = require('./src/routes/product.route.js')
const authRoute = require('./src/routes/auth.route.js')
const userRoute = require('./src/routes/user.route.js')

app.get('/', (req, res) => {
  res.send('Hello World! port 3000');
})

// api collecton
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
// api collection end

mongoose.connect('mongodb+srv://admin:iVYiVRUCKKksRm6A@kushandb.vwqpm.mongodb.net/Node-API?retryWrites=true&w=majority&appName=KushanDb')
    .then(() => {
      console.info('Connected MongoDB')
      app.listen(PORT, () => { 
        console.log(`Server is running on port ${PORT}`);
      })
    }).catch(() => console.log('Connection Failed'))