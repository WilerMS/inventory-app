import path from 'path'

export const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, 'inventory-app.sqlite')
  },
  useNullAsDefault: true,
  migrations: {
    directory: path.resolve(__dirname, 'migrations')
  }
}
