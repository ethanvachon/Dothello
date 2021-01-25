import { dbContext } from '../db/DbContext'

class ListsService {
  async create(data) {
    return dbContext.Lists.create(data)
  }
}

export const listsService = new ListsService()
