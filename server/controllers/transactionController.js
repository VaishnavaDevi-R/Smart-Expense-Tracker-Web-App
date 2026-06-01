const Transaction = require(
  "../models/Transaction"
);

// Add Transaction
const addTransaction = async (
  req,
  res
) => {
  const transaction =
    await Transaction.create({
      user: req.user.id,
      title: req.body.title,
      amount: req.body.amount,
      type: req.body.type,
      category: req.body.category,
    });

  res.status(201).json(transaction);
};

// Get Transactions
const getTransactions = async (
  req,
  res
) => {
  const transactions =
    await Transaction.find({
      user: req.user.id,
    });

  res.json(transactions);
};

const deleteTransaction = async (
  req,
  res
) => {
  try {
    const transaction =
      await Transaction.findById(
        req.params.id
      );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction Not Found",
      });
    }

    await Transaction.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      message:
        "Transaction Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  deleteTransaction,
};