// import { AppState } from '../AppState'
import { SocketHandler } from '../utils/SocketHandler'

class SocketService extends SocketHandler {
  constructor() {
    super()
    this
      .on('create:comment', this.createComment)
  }

  authenticate(bearerToken) {
    this.socket.emit('authenticate', bearerToken)
  }
}

export const socketService = new SocketService()
