const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/login', controller.login);
router.post('/login', controller.postLogin);
router.get('/create', authMiddleware.requiredAuth, controller.create);
router.post('/create', authMiddleware.requiredAuth, controller.postCreate);
router.get('/logout', controller.logout);

module.exports = router;