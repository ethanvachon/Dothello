import { dbContext } from '../db/DbContext'

class TasksService {
  async create(data) {
    return dbContext.Tasks.create(data)
  }
}

export const tasksService = new TasksService()
