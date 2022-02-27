const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')

const api = supertest(app)

const User = require('../models/user')
const bcrypt = require('bcryptjs')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('secret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('creating a new user', () => {
  test('works properly with correct fields', async()=>{
    const user = { username: 'roman', password:'123secret'}

    await api
      .post('/api/users')
      .send(user)
      .expect(200)

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(2)
  })
  test('works properly with incorrect fields', async()=>{
    const user = { username: 'ro', password:'xdd'}

    await api.post('/api/users')
      .send(user)
      .expect(400)

    const usersAtEnd = await api.get('/api/users')
    expect(usersAtEnd.body).toHaveLength(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})