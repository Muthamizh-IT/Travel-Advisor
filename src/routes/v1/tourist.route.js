const express = require('express');
const router = express.Router();
const TouristController = require('../../controllers/tourist.controller');

router.route('/').post(TouristController.createTourist).get(TouristController.getAlltourist);
router.route('/:id').get(TouristController.gettouristById).put(TouristController.updatetouristById);
router.route('/fetchTop/Fiveplaces').get(TouristController.get_Top_Five_places);
router.route('/fetch/tourist/places').get(TouristController.Fetch_placesWith_state);
module.exports = router;
