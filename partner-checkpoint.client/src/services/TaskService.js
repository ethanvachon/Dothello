import { AppState } from '../AppState'
import { Task } from '../models/Task'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const baseURL = '/api/tasks'

class TaskService {
  async getTasks() {
    try {
      const res = await api.get(baseURL)
      AppState.tasks = res.data.map(data => new Task(data))
    } catch (error) {
      logger.error(error)
    }
  }

  async postTask(data) {
    try {
      await api.post(baseURL, data)
      this.getTasks()
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteTask(id) {
    try {
      await api.delete(baseURL + id)
      this.getTasks()
    } catch (error) {
      logger.error(error)
    }
  }

  async putTask(data, id) {
    try {
      await api.put(baseURL + id, data)
      this.getTasks()
    } catch (error) {
      logger.error(error)
    }
  }
}

export const taskService = new TaskService()
