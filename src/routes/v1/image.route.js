const express = require('express');
const router = express.Router();
const ImageController = require('../../controllers/image.controller');
const middleware = require('../../middlewares/multer/sample');
router.route('/').post(middleware.array('image'), ImageController.createimage);

module.exports = router;
