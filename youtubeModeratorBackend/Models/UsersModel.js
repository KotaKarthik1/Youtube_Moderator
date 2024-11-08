const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Only for editors, hashed
  role: {
    type: String,
    enum: ["organizer", "editor"],
    required: true,
    defalut: "editor",
  },
  organizerId: { type: Schema.Types.ObjectId, ref: "User" }, // For editors, after acceptance
  editorIds: [{ type: Schema.Types.ObjectId, ref: "User" }], // Only for organizers
  youtubeChannelId: { type: String }, // Only for organizers
  // For editors
  organizerRequestStatus: {
    status: {
      type: String,
      enum: ["none", "pending", "approved", "rejected"],
      default: "none",
    },
    organizerId: { type: Schema.Types.ObjectId, ref: "User" }, // Organizer to whom the request is sent
  },
  // For organizers, managing incoming requests
  pendingEditors: [
    {
      editorId: { type: Schema.Types.ObjectId, ref: "User" }, // Editor's ID requesting to join
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
    },
  ],

  assignedTasks: [{ type: Schema.Types.ObjectId, ref: "Task" }], // Only for editors

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
