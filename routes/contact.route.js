const express = require('express')
const router = express.Router();
const controller = require('../controllers/contact.controller');

router.get('/', controller.index);

module.exports = router;