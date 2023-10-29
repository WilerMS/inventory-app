import { Model } from '@/db'
import { type JSONSchema } from 'objection'
import { type Zone } from './Zone'
import { type User } from './User'
import { getPredominantColor } from '@/utils'
import path from 'path'

// To get types in relationMappings requires imports
interface ZoneType { Zone: typeof Zone }
interface UserType { User: typeof User }

export class Product extends Model {
  static tableName: string = 'products'
  static idColumn: string | string[] = 'id'

  id!: number
  name!: string
  amount!: number
  image?: string
  color?: string
  user_id!: number
  zone_id!: number
  expiration_date?: string
  price?: number
  notes?: string

  zone?: Zone
  user?: User

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['name', 'user_id', 'zone_id'],
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      image: { type: 'string' },
      amount: { type: 'string' },
      user_id: { type: 'number' },
      zone_id: { type: 'number' },
      expiration_date: { type: 'string' },
      price: { type: 'number' },
      notes: { type: 'string' }
    }
  }

  static relationMappings () {
    const { Zone } = require('./Zone') as ZoneType
    const { User } = require('./User') as UserType

    return {
      zone: {
        relation: Model.BelongsToOneRelation,
        modelClass: Zone,
        join: {
          from: 'products.zone_id',
          to: 'zones.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'products.user_id',
          to: 'users.id'
        }
      }
    }
  }

  async getZoneColor () {
    if (this.image) {
      this.color = await getPredominantColor(path.resolve(__dirname, '..', '..', 'public/images', this.image))
    }
  }

  async $afterFind () {
    return await this.getZoneColor()
  }
}
