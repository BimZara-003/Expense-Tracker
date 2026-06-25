const userController = require('../controllers/userController');
const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/users',userController.createUser);
router.post('/',userController.userLogin);


module.exports = router;