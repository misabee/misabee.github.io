const express = require('express');
const router = express.Router();
const controller = require('../controllers/products.controller');

router.get('/all', controller.index);
router.get('/id/:id', controller.getOneProduct);
router.get('/page', controller.paginationProducts);
router.post('/create', controller.create);
router.delete('/id/:id', controller.deleteProduct);

module.exports = router;