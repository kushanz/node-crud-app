const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

const productRoute = require('./src/routes/product.route.js')
const authRoute = require('./src/routes/auth.route.js')

app.get('/', (req, res) => {
  res.send('Hello World! port 3000');
})

// api collecton
app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
// api collection end

mongoose.connect('mongodb+srv://admin:iVYiVRUCKKksRm6A@kushandb.vwqpm.mongodb.net/Node-API?retryWrites=true&w=majority&appName=KushanDb')
    .then(() => {
      console.info('Connected MongoDB')
      app.listen(PORT, () => { 
        console.log(`Server is running on port ${PORT}`);
      })
    }).catch(() => console.log('Connection Failed'))