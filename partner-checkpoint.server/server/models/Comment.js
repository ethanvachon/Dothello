import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Comment = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, ref: 'Account', required: true },
    taskId: { type: ObjectId, ref: 'Task', required: true }
  }
)

Comment.virtual('user', {
  localField: 'userId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Comment
