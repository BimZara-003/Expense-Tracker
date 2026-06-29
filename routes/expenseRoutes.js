const expenseController = require('../controllers/expenseController');
const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, expenseController.createExpense);
router.get('/', authMiddleware, expenseController.getAllExpenses);
router.delete('/:id', authMiddleware, expenseController.deleteExpense);
router.get('/summary', authMiddleware, expenseController.userExpenses);
router.get('/recents',authMiddleware, expenseController.recentExpenses);

module.exports = router;