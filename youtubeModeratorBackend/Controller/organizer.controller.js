require("dotenv").config();
const User = require("../Models/UsersModel");
const jwtToken = require("../Models/jwt-token.model");
const bcrypt = require("bcryptjs");
const { signToken } = require("../helpers/jwt.helper");
const commonConstant = require("../constants/common.constant");
const HttpStatusConstant = require("../constants/http-message.constant");
const HttpStatusCode = require("../constants/http-code.constant");
const ResponseMessageConstant = require("../constants/response-message.constant");
const CommonConstant = require("../constants/common.constant");
const ErrorLogConstant = require("../constants/error-log.constant");

const imageController = require("./image.controller");
const Org = require("../Models/OrganizerModel");
const TaskModel = require("../Models/TasksModel");

//editor API'S

exports.handleImageupload=async(req,res)=>{
  try {
    console.log("file",req.file)

    const userId = req.user.id; // Assuming the user ID is sent in the request body
    console.log(userId);
const file = req.file
    const imageUrl = await imageController.uploadImageToS3(file.originalname,file, userId)
    await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          profileImageUrl: imageUrl,
        },
      }
    );

    // Update the user's profileImageUrl in the database
    await User.findByIdAndUpdate(userId, { profileImageUrl:imageUrl });

    // Send the S3 URL back to the frontend
    console.log("response is sending to frontend");
    res.status(200).json({ imageUrl});
    
  } catch (error) {
    
  }
}


exports.handleTextChange = async (req, res) => {
  try {
    console.log("handle text change triggered");
    const { newText } = req.body;
    console.log(newText);
    console.log(req.body);
    const userId = req.user.id;
    console.log("this is user id", userId);
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
      },
      {
        $set: {
          description: newText,
        },
      }
    );
    console.log(user);
    console.log("description updated");
    return res.status(200).json({ text: newText });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

exports.handleTotalTasksCount = async (req, res) => {
  try {
    console.log(req.body);
    const userId = req.user.id;
    console.log("this is user id", userId);
    const user = await User.findOne({
      _id: userId,
    });
    return res.status(200).json(user.assignedTasks.length);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// exports.handleGetWorkingOrganizers = async (req, res) => {
//   try {
//     console.log("handling all organizer details");
//     const userId = req.user.id;

//     // Fetch the current user (Editor)
//     const CurrentOrg = await Org.findOne({ _id: userId });

//     const editorDetails=[];
//     for(let i=0; i<CurrentOrg.editorIds.length; i++)
//     {
//         const editor = await User.find({_id:CurrentOrg.editorIds[i]});
//         let cnt=0;
//         for(let j=0;j<editor.assignedTasks.length;j++)
//         {
//             const currentTask = await TaskModel.find({_id:editor.assignedTasks[j]});
//             if(currentTask.organizerId==userId)
//             {
//                 cnt++;
//             }
//         }
//         editorDetails.append({editor.name,cnt});
//         return res.status(200).json({editorDetails});
//     }
//   } catch (err) {
//     return res.status(500).json({ error: err.message });
//   }
// };
exports.handleGetWorkingEditors = async (req, res) => {
    try {
      console.log("handling all organizer details");
      const userId = req.user.id;
  
      // Fetch the current organizer (Editor)
      const CurrentOrg = await Org.findOne({ _id: userId });
      if (!CurrentOrg) {
        return res.status(404).json({ error: "Organizer not found" });
      }
  
      const editorDetails = await Promise.all(
        CurrentOrg.editorIds.map(async (editorId) => {
          // Fetch editor details
          const editor = await User.findOne({ _id: editorId });
          if (!editor || !editor.assignedTasks) {
            return null; // Skip if editor or tasks are missing
          }
  
          // Count tasks assigned to this organizer
          let taskCount = 0;
          for (const taskId of editor.assignedTasks) {
            const currentTask = await TaskModel.findOne({ _id: taskId });
            if (currentTask && currentTask.organizerId == userId) {
              taskCount++;
            }
          }
  
          return { name: editor.name, taskCount };
        })
      );
  
      // Filter out null entries (in case of skipped editors)
      const filteredEditorDetails = editorDetails.filter((detail) => detail !== null);
  
      return res.status(200).json({ editorDetails: filteredEditorDetails });
    } catch (err) {
      console.error("Error fetching working organizers:", err);
      return res.status(500).json({ error: err.message });
    }
  };
  