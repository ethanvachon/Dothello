import { listsService } from '../services/ListsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class ListsController extends BaseController {
  constructor() {
    super('api/lists')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createList)
  }

  async createList(req, res, next) {
    try {
      res.send(await listsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }
}
