import { AppState } from '../AppState'
import { Board } from '../models/Board'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

const baseURL = '/api/boards/'

class BoardService {
  async getBoards() {
    try {
      const res = await api.get(baseURL)
      AppState.boards = res.data.map(data => new Board(data))
    } catch (error) {
      logger.error(error)
    }
  }

  async getBoard(id) {
    try {
      const res = await api.get(baseURL + id)
      AppState.board = new Board(res.data)
    } catch (error) {
      logger.error(error)
    }
  }

  async postBoard(data) {
    try {
      await api.post(baseURL, data)
      this.getBoards()
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteBoard(id) {
    try {
      await api.delete(baseURL + id)
      this.getBoards()
    } catch (error) {
      logger.error(error)
    }
  }

  async putBoard(data, id) {
    try {
      await api.put(baseURL + id, data)
      this.getBoard(id)
    } catch (error) {
      logger.error(error)
    }
  }

  async addCollaborator(id, email) {
    try {
      await api.post(baseURL + id + '/collaborators', { email: email })
    } catch (error) {
      logger.error(error)
    }
  }
}

export const boardService = new BoardService()
