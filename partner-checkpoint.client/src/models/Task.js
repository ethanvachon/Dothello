export class Task {
  constructor(data) {
    this.name = data.name
    this.listId = data.list
    this.id = data._id
    this.boardId = data.boardId
    this.order = data.order
    this.completed = data.completed
  }
}
