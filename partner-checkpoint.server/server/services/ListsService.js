import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class ListsService {
  async create(data) {
    return dbContext.Lists.create(data)
  }

  async delete(id) {
    const deleted = dbContext.Lists.findByIdAndDelete(id)
    if (!deleted) {
      throw new BadRequest('invalid id')
    }
    return deleted
  }

  async edit(body, id) {
    const edited = dbContext.Lists.findByIdAndUpdate(id, body, { new: true })
    if (!edited) {
      throw new BadRequest('invalid id')
    }
    return edited
  }
}

export const listsService = new ListsService()
