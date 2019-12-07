require('dotenv').config();

var bodyParser = require('body-parser')

const express = require('express');
const app = express();
const port = process.env.PORT || 7000;

const db = require('./mongodb/db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db(db => {
    console.log('Started');
});

app.set('view engine', 'pug');
app.set('views', './views');

const productsApiRoute = require('./api/routes/products.route');

const homeController = require('./controllers/home.controller');

const productsRoute = require('./routes/products.route');
const err404Route = require('./routes/err404.route');

app.use(express.static('public'));

app.use('/api/products', productsApiRoute);

app.get('/', homeController.index);
app.use('/products', productsRoute);
app.use('*', err404Route);

app.listen(port, function () {
    console.log('Server listening on port' + port);
});
