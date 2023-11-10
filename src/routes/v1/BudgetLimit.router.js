const express = require('express');
const router = express.Router();
const BudgetLimitController = require('../../controllers/BudgetLimit.Controller');

router.route('/').post(BudgetLimitController.createBudgetLimit);

module.exports = router;
