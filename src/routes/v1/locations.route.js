const express = require('express');
const router = express.Router();
const locationController = require('../../controllers/locations.controller');

router.route('/').post(locationController.createLocations).get(locationController.getAllLocation);
router.route('/:id').get(locationController.getLocationById).put(locationController.updateLocationById);

module.exports = router;
