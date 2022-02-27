const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const helpers = require('./test_helpers')

let TOKEN

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const rootUser = await new User({
    username: 'root',
    passowrd: 'secret',
  }).save()
  
  const userForToken = { username: rootUser.username, id: rootUser.id }
  TOKEN = jwt.sign(userForToken, process.env.JWT_SEC)

  await Promise.all(
    helpers.initialBlogs.map((blog) => {
      blog.user = rootUser.id
      return new Blog(blog).save()
    })
  )
})

const api = supertest(app)

describe('when there is initially some post saved', () => {
  test('all posts are returned (as json)', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helpers.initialBlogs.length)
  },10000)

  test('id is a unique property of the blog posts',async ()=>{
    const response = await api.get('/api/blogs')
    response.body.forEach((post) => {
      expect(post.id).toBeDefined()
    })
  })})

describe('addition of a new post',()=>{
  test('POST requests are done correctly', async () =>{
    const newBlog = 
    {
      title: 'Example title 1',
      author: 'Nobody 1',
      url: 'http://example1.com',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(201)
    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(helpers.initialBlogs.length+1)
    expect(blogsAtEnd.body.map((post)=>post.title)).toContain('React patterns')
  })

  test('Likes are missing form the request', async () =>{
    const newBlogWithoutLikes = 
    {
      title: 'Example title 2',
      author: 'Nobody 2',
      url: 'http://example2.com',
      likes: 2,
    }
    await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(201)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(helpers.initialBlogs.length+1)
  })

  test('title or author is missing from the request', async () =>{
    const newBlogWithoutAuthor = 
    {
      title: 'Example title3',
      url: 'http://example3.com',
      likes: 2,
    }
    await api
      .post('/api/blogs')
      .send(newBlogWithoutAuthor)
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(400)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(helpers.initialBlogs.length)
  })

  test('TOKEN is missing or invalid', async () =>{
    const newBlog =
    {
      title: 'Example title4',
      author: 'Nobody4',
      url: 'http://example4.com',
      likes: 2,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `Brer ${TOKEN}`)
      .expect(400)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(helpers.initialBlogs.length)
  })
})

describe('deletion of a post',()=>{
  test('succed with status code 204 if id is valid',async()=>{
    const blogsAtStart = await helpers.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${TOKEN}`)
      .expect(204)
      
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(helpers.initialBlogs.length - 1)
  })
})

describe('update of a post',()=>{
  test('succed with status code 200 if id is valid',async()=>{
    const blogToUpdate = 
    {
      title: 'Example title 4',
      author: 'Nobody 4',
      url: 'http://example4.com',
      likes: 2,
    }
    await api
      .put('/api/blogs/5a422aa71b54a676234d17f8')
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(helpers.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})