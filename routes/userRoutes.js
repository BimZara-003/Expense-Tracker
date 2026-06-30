const userController = require('../controllers/userController');
const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/users',userController.createUser);
router.post('/',userController.userLogin);
router.get('/details',authMiddleware,userController.userInformation);


module.exports = router;