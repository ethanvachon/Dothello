import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class CommentsService {
  async createComment(data) {
    const task = dbContext.Tasks.findById(data.taskId)
    data.boardId = task.boardId
    return dbContext.Comments.create(data)
  }

  async editComment(body, id) {
    const edited = dbContext.Comments.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!edited) {
      throw new BadRequest('invalid id')
    }
    return edited
  }

  async deleteComment(id) {
    const deleted = dbContext.Comments.findByIdAndDelete(id)
    if (!deleted) {
      throw new BadRequest('invalid id')
    }
    return deleted
  }
}

export const commentsService = new CommentsService()
