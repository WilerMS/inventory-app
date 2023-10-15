import { Model } from '@/db'
import { type JSONSchema } from 'objection'
import { type Product } from './Product'
import { type User } from './User'

// To get types in relationMappings requires imports
type ProductType = typeof Product
type UserType = typeof User

export class Zone extends Model {
  static tableName: string = 'zones'
  static idColumn: string | string[] = 'id'

  id!: number
  name!: string
  image?: string
  user_id!: number
  notes?: string

  products?: Product[]
  user?: User

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['name', 'user_id'],
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      image: { type: 'string' },
      user_id: { type: 'string' },
      notes: { type: 'string' }
    }
  }

  static relationMappings () {
    const Product = require('./Product') as ProductType
    const User = require('./User') as UserType

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
          to: 'users.id'
        }
      }
    }
  }
}
