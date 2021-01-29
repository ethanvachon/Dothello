import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import socketService from './SocketService'
class CommentsService {
  async deleteMany(query) {
    await dbContext.Comments.deleteMany(query)
  }

  async createComment(data) {
    const task = await dbContext.Tasks.findById(data.taskId)
    data.boardId = task.boardId
    const newComment = await dbContext.Comments.create(data)
    const result = await dbContext.Comments.findById(newComment.id).populate('userId')
    socketService.messageRoom(task.boardId, 'comment:create', result)
  }

  async editComment(body, id) {
    const edited = await dbContext.Comments.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    const task = await dbContext.Tasks.findById(edited.taskId)
    if (!edited) {
      throw new BadRequest('invalid id')
    }
    const result = await dbContext.Comments.findById(edited.id).populate('userId')
    socketService.messageRoom(task.boardId, 'comment:edit', result)
  }

  async deleteComment(id) {
    const comment = await dbContext.Comments.findById(id)
    const task = await dbContext.Tasks.findById(comment.taskId)
    const deleted = await dbContext.Comments.findByIdAndDelete(id)
    if (!deleted) {
      throw new BadRequest('invalid id')
    }
    socketService.messageRoom(task.boardId, 'comment:delete', { id: id, taskId: task.id })
  }
}

export const commentsService = new CommentsService()
