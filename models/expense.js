const mongoose = require("mongoose")

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        enum: ["Housing", "Transportation", "Food", "Utilities", "Insurance", "Healthcare","Education","Donations",
             "Debt", "Entertainment", "Clothing", "Other"]
    },
    expenseName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, {
    timestamps: true
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;