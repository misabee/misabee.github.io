const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const usersOrdersController = require('../controllers/usersOrdrers.controller');

router.get('/', usersController.index);
router.get('/all', usersController.all);
router.get('/orders', usersOrdersController.all);
router.get('/orders/unchecked', usersOrdersController.unchecked);

module.exports = router;