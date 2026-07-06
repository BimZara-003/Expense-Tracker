const userController = require('../controllers/userController');
const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/users',userController.createUser);
router.post('/',userController.userLogin);
router.get('/details',authMiddleware,userController.userInformation);
router.put('/profile', authMiddleware, userController.updateProfile);
router.put('/password', authMiddleware, userController.changePassword);

module.exports = router;