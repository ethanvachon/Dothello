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
      .post('', this.createBoard)
  }

  async getAll(req, res, next) {
    try {
      req.creatorId = req.userInfo.id
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

  async createBoard(req, res, next) {
    try {
      res.send(await boardsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }
}
