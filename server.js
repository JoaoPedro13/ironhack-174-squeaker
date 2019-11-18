require('dotenv').config();

const mongoose = require('mongoose');

const app = require('./app');

const DATABASE_URI = 'mongodb://localhost:27017/squeaker';

mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000);
  })
  .catch(error => {
    console.log('There was an error connecting to MongoDB');
  });
