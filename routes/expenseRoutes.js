const expenseController = require('../controllers/expenseController');
const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/', authMiddleware, expenseController.createExpense);
router.get('/', authMiddleware, expenseController.getExpenses);
router.delete('/:id', authMiddleware, expenseController.deleteExpense);

module.exports = router;