import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTask)
  }

  async createTask(req, res, next) {
    try {
      res.send(await tasksService.create(req.body))
    } catch (error) {
      next(error)
    }
  }
}
