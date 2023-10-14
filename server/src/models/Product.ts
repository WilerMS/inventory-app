import { Model } from '@/db'
import { type JSONSchema } from 'objection'
import { type Zone } from './Zone'
import { type User } from './User'

// To get types in relationMappings requires imports
type ZoneType = typeof Zone
type UserType = typeof User

export class Product extends Model {
  static tableName: string = 'products'
  static idColumn: string | string[] = 'id'

  id!: number
  name!: string
  amount!: number
  user_id!: number
  zone_id!: number
  expiration_date?: Date | string
  price?: number
  notes?: string

  zone?: Zone
  user?: User

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['name', 'user_id', 'zone_id'],
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      image: { type: 'string' },
      amount: { type: 'string' },
      user_id: { type: 'string' },
      zone_id: { type: 'string' },
      expiration_date: { type: 'string' },
      price: { type: 'string' },
      notes: { type: 'string' }
    }
  }

  static relationMappings () {
    const Zone = require('./Zone') as ZoneType
    const User = require('./User') as UserType

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
}
