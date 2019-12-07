const express = require('express');
const router = express.Router();
const controller = require('../controllers/err404.controller');

router.get('/', controller.index);

module.exports = router;