import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BoardsService {
  async getOne(id) {
    const data = dbContext.Boards.findById(id).populate('userId')
    if (!data) {
      throw new BadRequest('invalid id')
    }
    return data
  }

  async getAll(data) {
    const created = await dbContext.Boards.find(data).populate('userId')
    created.push(...await dbContext.Boards.find({ collaborators: { $in: [data.userId] } }))
    return created
  }

  getLists(data) {
    const lists = dbContext.Lists.find(data)
    if (!lists) {
      throw new BadRequest('invaid id')
    }
    return lists
  }

  getTasks(data) {
    return dbContext.Tasks.find(data)
  }

  async create(data) {
    const img = ['https://wallpaperheart.com/wp-content/uploads/2018/03/hd-background-wallpapers-free-amazing-cool-tablet-high-definition.jpg', 'https://wallpaperaccess.com/full/138733.jpg', 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb', 'https://wallpaperaccess.com/full/30100.jpg']
    data.imgUrl = img[Math.floor(Math.random() * img.length)]
    return dbContext.Boards.create(data)
  }

  edit(body, id) {
    const edited = dbContext.Boards.findByIdAndUpdate(id, body, { new: true, runValidators: true })
    if (!edited) {
      throw new BadRequest('invalid id')
    }
    return edited
  }

  delete(id) {
    const deleted = dbContext.Boards.findByIdAndDelete(id)
    if (!deleted) {
      throw new BadRequest('invalid id')
    }
    return deleted
  }

  async addCollaborator(id, emailQueryObj) {
    const account = await dbContext.Account.findOne(emailQueryObj)
    if (account) {
      return dbContext.Boards.findByIdAndUpdate(id, { $push: { collaborators: account.id } }, { new: true, runValidators: true })
    }
  }
}

export const boardsService = new BoardsService()
