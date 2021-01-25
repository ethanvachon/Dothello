import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = mongoose.Schema.Types.ObjectId

const ListItem = new Schema(
  {
    name: { type: String, required: true },
    list: { type: ObjectId, ref: 'List', required: true }
  }
)

export default ListItem
