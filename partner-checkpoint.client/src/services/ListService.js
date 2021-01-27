import { AppState } from '../AppState'
import { List } from '../models/List'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const baseURL = '/api/lists/'

class ListService {
  async getLists(boardId) {
    try {
      const res = await api.get('/api/boards/' + boardId + '/lists')
      AppState.lists = res.data.map(data => new List(data))
    } catch (error) {
      logger.error(error)
    }
  }

  async postList(data) {
    try {
      await api.post(baseURL, data)
      this.getLists(data.boardId)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteList(id, boardId) {
    try {
      await api.delete(baseURL + id)
      this.getLists(boardId)
    } catch (error) {
      logger.error(error)
    }
  }

  async putList(data, id, boardId) {
    try {
      await api.put(baseURL + id, data)
      this.getLists(boardId)
    } catch (error) {
      logger.error(error)
    }
  }
}

export const listService = new ListService()
