import { listsService } from '../services/ListsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createList)
      .delete('/:id', this.delete)
      .put('/:id', this.edit)
  }

  async createList(req, res, next) {
    try {
      res.send(await listsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await listsService.delete(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await listsService.edit(req.body, req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
