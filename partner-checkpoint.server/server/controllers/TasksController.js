import { tasksService } from '../services/TasksService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class TasksController extends BaseController {
  constructor() {
    super('api/tasks')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/:id/comments', this.getComments)
      .post('', this.createTask)
      .put('/:id', this.edit)
      .delete('/:id', this.delete)
  }

  async getComments(req, res, next) {
    try {
      res.send(await tasksService.getComments({ taskId: req.params.id }))
    } catch (error) {
      next(error)
    }
  }

  async createTask(req, res, next) {
    try {
      res.send(await tasksService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      res.send(await tasksService.edit(req.body, req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await tasksService.delete(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
