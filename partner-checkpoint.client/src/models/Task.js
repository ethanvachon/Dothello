export class Task {
  constructor(data) {
    this.name = data.name
    this.listId = data.list
    this.id = data._id
  }
}
