import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const Task = new Schema(
  {
    name: { type: String, required: true },
    list: { type: ObjectId, ref: 'List', required: true },
    board: { type: ObjectId, ref: 'Board', required: true }
  }
)

export default Task
