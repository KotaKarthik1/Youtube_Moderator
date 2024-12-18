const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const crypto = require("crypto");

const OrgSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    required: true,
    defalut: "organizer",
  },
  profileImageUrl: { type: String, default: "" },
  editorIds: [{ type: Schema.Types.ObjectId, ref: "User" }], // Only for organizers
  youtubeChannelId: { type: String }, // Only for organizers
  youtubeChannelName:{type:String},
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
  taskscreated:[
    {
      taskid:{type:Schema.Types.ObjectId,ref:"Task"},
      editorId:{ type: Schema.Types.ObjectId, ref: "User" }
    }
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to update `updatedAt` automatically
OrgSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});
const Org = mongoose.model("Org", OrgSchema);
module.exports = Org;
