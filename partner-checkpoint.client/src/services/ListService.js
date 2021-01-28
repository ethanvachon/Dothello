import { AppState } from '../AppState'
import { List } from '../models/List'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const baseURL = '/api/lists/'

const colors = [
  '#ff4747',
  '#ffac47',
  '#ffda47',
  '#87ff47',
  '#47ffa9',
  '#47daff',
  '#4791ff',
  '#9d47ff',
  '#ff47ce'
]

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
      data.color = colors[Math.floor(Math.random() * colors.length)]
      await api.post(baseURL, data)
      await this.getLists(data.boardId)
      const scroll = document.getElementById('board-scroll')
      scroll.scrollLeft = scroll.scrollWidth
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
