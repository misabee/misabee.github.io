const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');

router.get('/', controller.index);
router.get('/submit', controller.submit);
router.post('/submit/order', controller.order);

module.exports = router;