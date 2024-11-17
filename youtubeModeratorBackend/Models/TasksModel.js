const taskSchema = new Schema({
    taskName:{type:String,required:true},
    organizerId: { type: Schema.Types.ObjectId, ref: 'Org', required: true },  // Organizer who created the task
    editorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Editor assigned to the task
    rawVideoUrl: { type: String, required: true },  // S3 URL for the raw video
    editedVideoUrls: [{ type: String }],  // Array of S3 URLs for edited video versions
    taskDetails: { type: String },  // Instructions from the organizer
    taskStatus: { 
      type: String, 
      enum: ['assigned', 'in_progress', 'submitted', 'approved', 'rejected'], 
      default: 'assigned' 
    },  // Task status
    messages: [
      {
        //change ref here
        senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  // Who sent the message (organizer or editor)
        message: { type: String, required: true },  // Message content
        timestamp: { type: Date, default: Date.now }  // Time and date of the message
      }
    ],  // Messages exchanged between the organizer and editor
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  const TaskModel = mongoose.model('Task', taskSchema);
  module.exports = TaskModel;
  