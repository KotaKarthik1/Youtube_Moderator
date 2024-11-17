const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  });
  
  

//Editor controllers
const authControllerEditor = require("../Controller/autheditor.controller.js");
const editorController =  require('../Controller/Editor.controller.js');

// Importing middlewares
const verifyEditor =  require("../middleware/verifyEditor.js");


//editor profile 
// router.post('/EditorProfileImageChange',upload.single("image"),editorController.handleImageUpdate);
router.post('/EditorDescChange',verifyEditor ,editorController.handleTextChange);
router.get('/EditorTotalTasksCount',verifyEditor,editorController.handleTotalTasksCount);
router.post("/EditorProfileImageChange", verifyEditor,upload.single("profilePic"), editorController.handleImageupload);

router.get('/AllOrganizers',verifyEditor,editorController.handleGetAllOrganizers);
  


module.exports = router;