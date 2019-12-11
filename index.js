const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 7000;

const db = require('./mongodb/db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser(process.env.SESSION_SECRET || 'idcuvsdvcysdvcvc2344524545'));

db(db => {
    console.log('Started');
});

app.set('view engine', 'pug');
app.set('views', './views');

const authMiddleware = require('./middlewares/auth.middleware');
const checkUserMiddleware = require('./middlewares/checkUserMiddleware');

const productsApiRoute = require('./api/routes/products.route');

const homeController = require('./controllers/home.controller');

const productsRoute = require('./routes/products.route');
const contactRoute = require('./routes/contact.route');
const cartRoute = require('./routes/cart.route');
const authRoute = require('./routes/auth.route');
const usersRoute = require('./routes/users.route');

const err404Route = require('./routes/err404.route');

app.use(express.static('public'));

app.use('/api/products', productsApiRoute);

app.get('/', checkUserMiddleware.isLogin, homeController.index);
app.use('/products', checkUserMiddleware.isLogin, productsRoute);
app.use('/contact', checkUserMiddleware.isLogin, contactRoute);
app.use('/cart', checkUserMiddleware.isLogin, cartRoute);
app.use('/auth', checkUserMiddleware.isLogin, authRoute);
app.use('/users', authMiddleware.requiredAuth, checkUserMiddleware.isLogin, usersRoute);

app.use('*', checkUserMiddleware.isLogin, err404Route);

app.listen(port, function () {
    console.log('Server listening on port: ' + port);
});
