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

// task 601075f407d902164c5e9ce8
// user a530a12a-7747-42e6-bf55-9231c4fecad2
