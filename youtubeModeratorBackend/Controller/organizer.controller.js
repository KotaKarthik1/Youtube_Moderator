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

//org api's


// exports.handleYoutubeNameChange = async (req, res) => {
//   try {
//     console.log("handle youtube name change triggered");
//     const { newText } = req.body;
//     console.log(newText);
//     console.log(req.body);
//     const userId = req.user.id;
//     console.log("this is user id", userId);
//     const user = await Org.findOneAndUpdate(
//       {
//         _id: userId,
//       },
//       {
//         $set: {
//           youtubeChannelName: newText,
//         },
//       }
//     );
//     console.log(user);
//     console.log("channel name updated updated");
//     return res.status(200).json({ youtubeChannelName: newText });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({ error: err });
//   }
// };
const mongoose = require("mongoose");

exports.handleYoutubeNameChange = async (req, res) => {
  try {
    console.log("handle youtube name change triggered");
    const { newText,id } = req.body;
    console.log(newText);
    console.log(req.body);

    console.log("this is user id", id);

    // Ensure `userId` is a valid ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({ error: "Invalid user ID format" });
    // }

    const user = await Org.findOneAndUpdate(
      { _id: id },
      { $set: { youtubeChannelName: newText } },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    console.log(user);
    console.log("channel name updated");
    return res.status(200).json({ youtubeChannelName: newText });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message });
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
      const userId = req.user;
  
      // Fetch the curr.ent organizer (Editor)
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
  