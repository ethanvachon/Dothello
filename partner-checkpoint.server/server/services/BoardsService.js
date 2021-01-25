import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getOne(id) {
    const data = dbContext.Boards.findById(id).populate('userId')
    if (!data) {
      throw new BadRequest('invalid id')
    }
    return data
  }

  async getAll(data) {
    return dbContext.Boards.find(data).populate('userId')
  }

  async create(data) {
    return dbContext.Boards.create(data)
  }
}

export const boardsService = new BoardsService()
