import { commentsService } from '../services/CommentsService'
import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .put('/:id', this.editComment)
      .delete('/:id', this.deleteComment)
  }

  async createComment(req, res, next) {
    try {
      res.send(await commentsService.createComment(req.body))
    } catch (error) {
      next(error)
    }
  }

  async editComment(req, res, next) {
    try {
      res.send(await commentsService.editComment(req.body, req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async deleteComment(req, res, next) {
    try {
      res.send(await commentsService.deleteComment(req.params.id))
    } catch (error) {
      next(error)
    }
  }
}
