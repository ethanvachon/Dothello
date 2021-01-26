import { AppState } from '../AppState'
import { Task } from '../models/Task'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const baseURL = '/api/tasks'

class TaskService {
  async getTasks(boardId) {
    try {
      const res = await api.get('/api/boards/' + boardId + '/tasks')
      AppState.tasks = res.data.map(data => new Task(data))
    } catch (error) {
      logger.error(error)
    }
  }

  async postTask(data) {
    try {
      await api.post(baseURL, data)
      this.getTasks(data.boardId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteTask(id, boardId) {
    try {
      await api.delete(baseURL + id)
      this.getTasks(boardId)
    } catch (error) {
      logger.error(error)
    }
  }

  async putTask(data, id, boardId) {
    try {
      await api.put(baseURL + id, data)
      this.getTasks(boardId)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const taskService = new TaskService()
