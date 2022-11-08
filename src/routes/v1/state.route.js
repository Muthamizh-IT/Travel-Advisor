const express = require('express');
const router = express.Router();
const StateController = require('../../controllers/state.controller');

router.route('/').post(StateController.createStates).get(StateController.getAllStates);
router.route('/:id').get(StateController.getStateById).put(StateController.updatestateById);
router.route('/details/Bystate/:id').get(StateController.getDetailsBy_State);
module.exports = router;
