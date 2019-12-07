const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');

router.get('/:id', controller.viewProduct);

module.exports = router;