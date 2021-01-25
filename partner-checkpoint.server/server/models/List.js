import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const List = new Schema(
  {
    name: { type: String, required: true },
    boardId: { type: ObjectId, ref: 'Board', required: true }
  }
)

export default List
