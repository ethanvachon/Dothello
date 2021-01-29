// import { AppState } from '../AppState'
import { AppState } from '../AppState'
import { Comment } from '../models/Comment'
import { List } from '../models/List'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('comment:create', this.createComment)
      .on('comment:edit', this.editComment)
      .on('comment:delete', this.deleteComment)
      .on('list:create', this.createList)
  }

  authenticate(bearerToken) {
    this.socket.emit('authenticate', bearerToken)
  }

  createComment(payload) {
    if (payload.taskId === AppState.task.id) {
      AppState.comments.push(new Comment(payload))
    }
  }

  editComment(payload) {
    if (payload.taskId === AppState.task.id) {
      const index = AppState.comments.findIndex(c => c.id === payload._id)
      AppState.comments.splice(index, 1, new Comment(payload))
    }
  }

  deleteComment(payload) {
    if (payload.taskId === AppState.task.id) {
      const index = AppState.comments.findIndex(c => c.id === payload.id)
      AppState.comments.splice(index, 1)
    }
  }

  async createList(payload) {
    await AppState.lists.push(new List(payload))
    const scroll = document.getElementById('board-scroll')
    scroll.scrollLeft = scroll.scrollWidth
  }
}

export const socketService = new SocketService()
