const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
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