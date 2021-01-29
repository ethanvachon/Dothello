import { AppState } from '../AppState'
import { Comment } from '../models/Comment'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const baseURL = '/api/comments/'

class CommentService {
  async getComments(taskId) {
    try {
      const res = await api.get('/api/tasks/' + taskId + '/comments')
      AppState.comments = res.data.map(data => new Comment(data))
    } catch (error) {
      logger.error(error)
    }
  }

  async postComment(data) {
    try {
      await api.post(baseURL, data)
      // this.getComments(data.taskId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteComment(id, taskId) {
    try {
      await api.delete(baseURL + id)
      this.getComments(taskId)
    } catch (error) {
      logger.error(error)
    }
  }

  async putComment(data, id, taskId) {
    try {
      await api.put(baseURL + id, data)
      this.getComments(taskId)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const commentService = new CommentService()
