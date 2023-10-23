export const knexConfig = {
  client: 'mysql2',
  connection: {
    host: '127.0.0.1' ?? '192.168.1.160',
    port: 3307,
    user: 'root',
    password: 'wiler',
    database: 'inventory'
  }
}
