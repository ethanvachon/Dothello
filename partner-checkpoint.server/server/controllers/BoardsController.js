import { boardsService } from '../services/BoardsService'
// import { listService } from '../services/ListsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class BoardsController extends BaseController {
  constructor() {
    super('api/boards')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getOne)
      .get('/:id/lists', this.getLists)
      .get('/:id/tasks', this.getTasks)
      .post('', this.createBoard)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getAll(req, res, next) {
    try {
      res.send(await boardsService.getAll({ userId: req.userInfo.id }))
    } catch (error) {
      next(error)
    }
  }

  async getOne(req, res, next) {
    try {
      res.send(await boardsService.getOne(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getLists(req, res, next) {
    try {
      res.send(await boardsService.getLists({ boardId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async getTasks(req, res, next) {
    try {
      res.send(await boardsService.getTasks({ boardId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async createBoard(req, res, next) {
    try {
      res.send(await boardsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await boardsService.edit(req.body, req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await boardsService.delete(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
