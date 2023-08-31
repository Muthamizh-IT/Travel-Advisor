const express = require('express');
const router = express.Router();
const DrwaingController = require('../../controllers/Drawing.controller');
const multer = require('multer');

// multer

const storage = multer.memoryStorage({
  destination: function (req, res, callback) {
    callback(null, '');
  },
});

const ImageuploadMiddleWare = multer({ storage }).fields([
  { name: 'outLine_img_Url', maxCount: 1 },
  { name: 'original_img_Url', maxCount: 1 },
]);

router.route('/uploadImage').post(ImageuploadMiddleWare, DrwaingController.createDrawing);
router.route('/').post(DrwaingController.createDrawing_Data).get(DrwaingController.getAllDrwaingData);

module.exports = router;
