import { Model } from '@/db'
import { type JSONSchema } from 'objection'
import { type Zone } from './Zone'
import { type Product } from './Product'

// To get types in relationMappings requires imports
type ZoneType = typeof Zone
type ProductType = typeof Product

export class User extends Model {
  static tableName: string = 'users'
  static idColumn: string | string[] = 'id'

  id!: number
  name!: string
  username!: string
  password!: string
  image?: string
  gender?: 'male' | 'female'
  birth_date?: Date | string

  zones?: Zone[]
  products?: Product[]

  static jsonSchema: JSONSchema = {
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      username: { type: 'string' },
      password: { type: 'string' },
      image: { type: 'string' },
      gender: { type: 'string' },
      birth_date: { type: 'string' }
    }
  }

  static loginJsonSchema = {
    type: 'object',
    required: ['username', 'password'],
    additionalProperties: false,
    properties: {
      username: { type: 'string' },
      password: { type: 'string' }
    }
  }

  static registerJsonSchema = {
    type: 'object',
    required: ['name', 'username', 'password'],
    additionalProperties: false,
    properties: {
      name: { type: 'string' },
      username: { type: 'string' },
      image: { type: 'string' },
      gender: { type: 'string' },
      birth_date: { type: 'string' },
      password: { type: 'string' }
    }
  }

  static relationMappings () {
    const Zone = require('./Zone') as ZoneType
    const Product = require('./Product') as ProductType

    return {
      zones: {
        relation: Model.HasManyRelation,
        modelClass: Zone,
        join: {
          from: 'user.id',
          to: 'zones.user_id'
        }
      },
      products: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'user.id',
          to: 'products.user_id'
        }
      }
    }
  }

  toResponse (): User {
    return {
      ...this,
      password: undefined
    } satisfies User
  }
}
