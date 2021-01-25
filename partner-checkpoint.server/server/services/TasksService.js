import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class TasksService {
  async create(data) {
    return dbContext.Tasks.create(data)
  }

  async edit(body, id) {
    const edited = dbContext.Tasks.findByIdAndUpdate(id, body, { new: true })
    if (!edited) {
      throw new BadRequest('invalid id')
    }
    return edited
  }

  async delete(id) {
    const deleted = dbContext.Tasks.findByIdAndDelete(id)
    if (!deleted) {
      throw new BadRequest('invalid id')
    }
    return deleted
  }
}

export const tasksService = new TasksService()
