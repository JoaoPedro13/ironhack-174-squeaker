require('dotenv').config();

const mongoose = require('mongoose');

const app = require('./app');

const DATABASE_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT);
  })
  .catch(error => {
    console.log('There was an error connecting to MongoDB');
  });
