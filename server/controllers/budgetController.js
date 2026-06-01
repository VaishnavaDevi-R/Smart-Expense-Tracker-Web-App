const Budget =
  require("../models/Budget");

const createBudget = async (
  req,
  res
) => {
  const budget =
    await Budget.create({
      user: req.user.id,
      amount: req.body.amount,
      month: req.body.month,
    });

  res.status(201).json(budget);
};

const getBudgets = async (
  req,
  res
) => {
  const budgets =
    await Budget.find({
      user: req.user.id,
    });

  res.json(budgets);
};

module.exports = {
  createBudget,
  getBudgets,
};