require('dotenv').config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
const PORT = process.env.NODE_ENV === 'test'
  ? process.env.TEST_PORT
  : process.env.PORT

const JWT_SEC = process.env.JWT_SEC

const TOKEN = process.env.TOKEN

module.exports = {
  MONGODB_URI,
  PORT,
  JWT_SEC,
  TOKEN
}