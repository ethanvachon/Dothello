export class Board {
  constructor(data) {
    this.id = data._id
    this.name = data.name
    this.user = data.userId
    this.imgUrl = data.imgUrl
  }
}
