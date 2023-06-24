const express = require('express');
const router = express.Router();
const BudgetUserController = require('../../controllers/budgetUser.controller');

router.route('/').post(BudgetUserController.createUser);
router.route('/verify').post(BudgetUserController.Verified);
router.route('/login').post(BudgetUserController.Login);
module.exports = router;
