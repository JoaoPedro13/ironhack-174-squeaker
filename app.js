const path = require('path');

const express = require('express');
const hbs = require('hbs');
const nodeSassMiddleware = require('node-sass-middleware');

const postRouter = require('./routes/post');

const app = express();

hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(
  nodeSassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: false,
    force: true
  })
);

app.use(express.static('public'));

app.get('/', (req, res, next) => {
  res.render('index');
});

app.use('/post', postRouter);

module.exports = app;
