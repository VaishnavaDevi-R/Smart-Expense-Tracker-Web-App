const express = require("express");

const {
  createBudget,
  getBudgets,
} = require(
  "../controllers/budgetController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

const router = express.Router();

router.post(
  "/",
  protect,
  createBudget
);

router.get(
  "/",
  protect,
  getBudgets
);

module.exports = router;