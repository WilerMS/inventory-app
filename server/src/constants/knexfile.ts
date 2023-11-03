import {
  OBJECTION_DB_HOST,
  OBJECTION_DB_NAME,
  OBJECTION_DB_PASSWORD,
  OBJECTION_DB_PORT,
  OBJECTION_DB_USER
} from './env'

export const knexConfig = {
  client: 'mysql2',
  connection: {
    host: OBJECTION_DB_HOST,
    port: OBJECTION_DB_PORT,
    user: OBJECTION_DB_USER,
    password: OBJECTION_DB_PASSWORD,
    database: OBJECTION_DB_NAME
  }
}
