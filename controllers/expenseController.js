const Expense = require("../models/expense");

const createExpense = async (req,res) => {  // Create Expense Logic

    try{
        const { title, expenseName, amount, date, userId } = req.body;

        if(!title || !expenseName || !amount || !date){
            return res.status(400).json({
                message: "All fields are required"
            })
        };

        if(date > new Date()){
            return res.status(400).json({
                message: "Date cannot be in the future"
            })
        };

        if(date < new Date("1909-08-21")){
            return res.status(400).json({
                message: "Date cannot be before 2000-01-01"
            })
        }

        const user = req.userId;

        const newExpense = new Expense({
            title: title,
            expenseName: expenseName,
            amount: amount,
            date: date,
            userId: user
        });

        await newExpense.save();

        res.status(201).json({
            message: "Expense Created Successfully",
            expense: newExpense
        });
    } catch(error){
        console.error("Error Creating Expense: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getExpenses = async (req,res) => { // Get Expenses Logic

    try{
        const user = req.userId;
        const expenses = await Expense.find({userId: user}).sort({date: -1});
    
        res.status(200).json({
            message: "Expenses retrieved successfully",
            expenses: expenses
        });
    } catch(error){
        console.error("Error fetching expenses: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const deleteExpense = async (req,res) => { // Delete Expense Logic

    try{
        const expenseId = req.params.id;
        const user = req.userId;

        const expense = await Expense.findOne({_id: expenseId, userId: user});

        if(!expense){
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        await Expense.findByIdAndDelete(expenseId);

        res.status(200).json({
            message: "Expense deleted successfully"
        });
    } catch(error){
        console.error("Error deleting expense: ", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = {
    createExpense,
    getExpenses,
    deleteExpense
};