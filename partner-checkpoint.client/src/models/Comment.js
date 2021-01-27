export class Comment {
  constructor(data) {
    this.id = data._id
    this.taskId = data.taskId
    this.userId = data.userId._id
    this.userName = data.userId.name
    this.name = data.name
  }
}
