import { Model } from '@/db'
import { type JSONSchema } from 'objection'
import { type Product } from './Product'
import { type User } from './User'
import { getPredominantColor } from '@/utils'
import path from 'path'

// To get types in relationMappings requires imports
interface ProductType { Product: typeof Product }
interface UserType { User: typeof User }

export class Zone extends Model {
  static tableName: string = 'zones'
  static idColumn: string | string[] = 'id'

  id!: number
  name!: string
  image?: string
  user_id!: number
  notes?: string
  color?: string

  products?: Product[]
  user?: User

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['name', 'user_id'],
    additionalProperties: false,
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      image: { type: 'string' },
      user_id: { type: 'number' },
      notes: { type: 'string' }
    }
  }

  static relationMappings () {
    const { Product } = require('./Product') as ProductType
    const { User } = require('./User') as UserType

    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'zones.id',
          to: 'products.zone_id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'zones.user_id',
          to: 'users_inventory.id'
        }
      }
    }
  }

  async getZoneColor () {
    if (this.image) {
      this.color = await getPredominantColor(path.resolve(__dirname, '..', '..', 'public/images', this.image))
    }
  }

  async calculateColor () {
    if (this.image) {
      this.color = await getPredominantColor(path.resolve(__dirname, '..', '..', 'public/images', this.image))
    }
  }

  async $beforeInsert () {
    await this.calculateColor()
  }

  async $beforeUpdate () {
    await this.calculateColor()
  }
}
