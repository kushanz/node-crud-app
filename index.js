const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false })); // for parsing application/x-www-form-urlencoded

const productRoute = require('./routes/product.route.js')

app.get('/', (req, res) => {
  res.send('Hello World! port 3000');
})

// api collecton
app.use('/api/products', productRoute)
// api collection end

mongoose.connect('mongodb+srv://admin:iVYiVRUCKKksRm6A@kushandb.vwqpm.mongodb.net/Node-API?retryWrites=true&w=majority&appName=KushanDb')
    .then(() => {
      console.info('Connected MongoDB')
      app.listen(3000, () => { 
        console.log('Server is running on port 3000');
      })
    }).catch(() => console.log('Connection Failed'))