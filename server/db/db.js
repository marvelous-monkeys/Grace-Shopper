const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const forWindows = require('../../secrets')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const winConfig = {
  host: 'localhost',
  port: 5432,
  logging: false,
  dialect: 'postgres',
  database: 'graceshopper',
  username: 'postgres'
}

let db

if (forWindows === true) {
  db = new Sequelize(winConfig)
} else {
  db = new Sequelize(
    process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
    {
      logging: false
    }
  )
}

module.exports = db

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
