const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');

router.get('/search', controller.search);
router.get('/:id', controller.viewProduct);

module.exports = router;