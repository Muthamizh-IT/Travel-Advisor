const express = require('express');
const router = express.Router();
const DeleciousController = require('../../controllers/Delecious.controller');
const multer = require('multer');

const storage = multer.memoryStorage({
  destination: function (req, res, callback) {
    callback(null, '');
  },
});

const ImageuploadMiddleWare = multer({ storage }).array('ImageURL');

router.route('/ImageUpload').post(ImageuploadMiddleWare, DeleciousController.ImageUpload);
router.route('/filters').get(DeleciousController.filtersBy_KeyWords);

module.exports = router;
