import { logger } from '../config/index.js'
import { AppError } from '../utils/index.js'
import { StatusCodes } from 'http-status-codes'

export class CrudRepository {
  constructor(model) {
    this.model = model
    console.log('Model received in CrudRepository:', model?.name)
  }

  async create(data) {
    const response = await this.model.create(data)
    return response
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: { id: data },
    })
    return response
  }

  async get(data) {
    const response = await this.model.findByPk(data)
    if (!response) {
      throw new AppError('Not able to found a resource', StatusCodes.NOT_FOUND)
    }
    return response
  }

  async getAll() {
    const response = await this.model.findAll()
    if (!response) {
      throw new AppError('Not able to found a resource', StatusCodes.NOT_FOUND)
    }
    return response
  }

  // data -> {col: value}
  async update(id, data) {
    const response = await this.model.update(data, {
      where: {
        id: id,
      },
    })
    if (response[0] === 0) {
      throw new AppError('Not able to found a resource', StatusCodes.NOT_FOUND)
    }
    return response
  }
}
