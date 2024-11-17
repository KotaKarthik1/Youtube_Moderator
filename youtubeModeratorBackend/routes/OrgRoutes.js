const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage(),
    // limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  });
  
  

//Org controllers
const orgController =  require('../Controller/organizer.controller.js');

// Importing middlewares
const verifyOrganizer =  require("../middleware/verifyOrganizer.js");


//org profile 
router.post('/handleYoutubeNameChange',verifyOrganizer ,orgController.handleYoutubeNameChange);

  


module.exports = router;