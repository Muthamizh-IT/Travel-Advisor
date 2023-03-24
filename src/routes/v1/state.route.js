const express = require('express');
const router = express.Router();
const StateController = require('../../controllers/state.controller');

router.route('/').post(StateController.createStates).get(StateController.getAllStates);
router.route('/:id').get(StateController.getStateById).put(StateController.updatestateById);
router.route('/details/Bystate/:id').get(StateController.getDetailsBy_State);
router.route('/popular/states').get(StateController.getPopular_States);
router.route('/getStates/ByPartition/:id').get(StateController.getStates_By_Partition);
router.route('/delete/image/:id').put(StateController.delete_image);
module.exports = router;
