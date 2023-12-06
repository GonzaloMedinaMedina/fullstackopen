const mongoose = require('mongoose')
mongoose.set("bufferTimeoutMS", 30000)
const supertest = require('supertest')
const config = require('../utils/config')
const logger = require('../utils/logger')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await helper.createUsers()
    }, 300000)
    
    test('valid username and password return token', async () => {    
        const loginBody = 
        {
            username: 'root',
            password: 'sekret'
        }
        
        const token = await api
            .post('/api/login')
            .send(loginBody)
            .expect(200)

        expect(token).toBeDefined();
    }, 300000)

    test('invalid username return 401', async () => {    
        const loginBody = 
        {
            username: 'ro',
            password: 'sekret'
        }
        
        await api
            .post('/api/login')
            .send(loginBody)
            .expect(401)
    }, 300000)

    test('invalid password return 401', async () => {    
        const loginBody = 
        {
            username: 'root',
            password: 'se'
        }

        await api
            .post('/api/login')
            .send(loginBody)
            .expect(401)
    }, 300000)
})

afterAll(async () => {
  await mongoose.connection.close()
})