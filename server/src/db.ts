import { Model } from 'objection'
import Knex from 'knex'

import { knexConfig } from '@/constants/knexfile'

const knex = Knex(knexConfig)

Model.knex(knex)

export { knex, Model }
