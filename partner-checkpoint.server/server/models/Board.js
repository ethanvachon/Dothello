import mongoose from 'mongoose'
const Schema = mongoose.Schema

const Board = new Schema(
  {
    name: { type: String, required: true },
    userId: { type: String, ref: 'Account', required: true },
    imgUrl: { type: String, required: true }
  }
)

Board.virtual('user', {
  localField: 'userId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
})

export default Board
