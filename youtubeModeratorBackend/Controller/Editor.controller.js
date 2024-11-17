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

exports.handleGetAllOrganizers = async (req, res) => {
  try {
    console.log("handling all organizer details");
    const userId = req.user.id;

    // Fetch the current user (Editor)
    const CurrentEditor = await User.findOne({ _id: userId });
    // console.log("is current editor",CurrentEditor);

    // If the editor is already working with another organizer
    if (CurrentEditor?.organizerId) {
      return res.status(200).json({ message: "Working with other Organizer" });
    }

    // Extract search query from request (default to empty string if not provided)

    const searchQuery = req.query.search || "";

    // Create a filter for the query
    console.log("searchquery is ",searchQuery);
    const filter = searchQuery
      ? { name: { $regex: searchQuery, $options: "i" } } // Case-insensitive partial match
      : {};

    // Fetch organizers based on the filter and include only 'name' and 'youtubeChannelName'
    const organizers = await Org.find(filter, "name youtubeChannelName");

    return res.status(200).json({ organizers });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
