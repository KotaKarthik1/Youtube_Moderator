const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const taskSchema = new Schema({
  taskName: { type: String, required: true },
  organizerId: { type: Schema.Types.ObjectId, ref: "Org", required: true }, // Organizer who created the task
  editorId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Editor assigned to the task
  rawVideoUrl: [{ type: String, required: true }], // S3 URL for the raw video
  editedVideoUrls: [
    {
      url: { type: String, required: true }, // S3 URL for the edited video
      uploadedToYoutube: { type: Boolean, default: false }, // New field],  // Array of S3 URLs for edited video versions
    },
  ],
  taskDetails: { type: String }, // Instructions from the organizer
  taskStatus: {
    type: String,
    enum: ["assigned", "in_progress", "completed"],
    default: "in_progress",
  }, // Task status
  deadline: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;
