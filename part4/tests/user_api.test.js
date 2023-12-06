const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
mongoose.set("bufferTimeoutMS", 30000)
const supertest = require('supertest')
const config = require('../utils/config')
const logger = require('../utils/logger')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
  logger.info(`Server uri ${config.MONGODB_URI}`)
})


describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    const user2 = new User({ username: 'root2', passwordHash })

    await user.save()
    await user2.save()
  }, 100000)

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }, 100000)

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 100000)

  test('creation fails with proper statuscode and message if username length is less than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ro',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(`User validation failed: username: Path \`username\` (\`${newUser.username}\`) is shorter than the minimum allowed length (3).`)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 100000)

  test('creation fails with proper statuscode and message if password length is less than 3', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain("malformatted password. It must be a string of 3 character minimum size")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 100000)

  test('creation fails with proper statuscode and message if password length is not a string', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 1234,
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain("malformatted password. It must be a string of 3 character minimum size")

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  }, 100000)

  test('there are two users in the database', async () => {
    const result = await api
      .get(`/api/users`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(result.body.length).toBe(2)
  })
})