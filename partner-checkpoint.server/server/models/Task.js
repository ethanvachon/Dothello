import mongoose from 'mongoose'
import { commentsService } from '../services/CommentsService'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Task = new Schema(
  {
    name: { type: String, required: true },
    list: { type: ObjectId, ref: 'List', required: true },
    boardId: { type: ObjectId, ref: 'Board', required: true },
    completed: { type: Boolean, default: false }
  }
)

Task.pre('findOneAndRemove', function(next) {
  try {
    commentsService.deleteMany({ taskId: this._conditions._id })
  } catch (error) {
    next(error)
  }
})
export default Task
