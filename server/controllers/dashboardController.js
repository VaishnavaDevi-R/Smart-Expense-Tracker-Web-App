const Transaction = require("../models/Transaction");

const getDashboardSummary = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      user: req.user.id,
    });

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });

    const balance =
      totalIncome - totalExpense;

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
      totalTransactions:
        transactions.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardSummary,
};