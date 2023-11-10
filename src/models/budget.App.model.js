const mongoose = require('mongoose');
const { v4 } = require('uuid');

const BudgetLimitSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    Amount: {
      type: Number,
      required: true,
    },
    SpendAmount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const BudgetLimit = mongoose.model('BudgetLimit', BudgetLimitSchema);

module.exports = {
  BudgetLimit,
};
