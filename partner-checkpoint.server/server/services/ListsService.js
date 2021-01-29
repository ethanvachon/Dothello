import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
import socketService from './SocketService'

class ListsService {
  async create(data) {
    const newList = await dbContext.Lists.create(data)
    socketService.messageRoom(newList.boardId, 'list:create', newList)
  }

  async delete(id) {
    const deleted = dbContext.Lists.findByIdAndDelete(id)
    if (!deleted) {
      throw new BadRequest('invalid id')
    }
    return deleted
  }

  async edit(body, id) {
    const edited = await dbContext.Lists.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!edited) {
      throw new BadRequest('invalid id')
    }
    socketService.messageRoom(edited.boardId, 'list:edit', edited)
  }
}

export const listsService = new ListsService()
