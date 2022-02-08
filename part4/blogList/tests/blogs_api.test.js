const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const initialNotes = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
]
beforeEach(async () => {
  await Blog.deleteMany({})
  
  for (let blog of initialNotes) {
    let blogObject = new Blog(blog)
    await blogObject.save()}
  
})

const api = supertest(app)

describe('when there is initially some post saved', () => {
  test('all posts are returned (as json)', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(initialNotes.length)
  },10000)

  test('id is a unique property of the blog posts',async ()=>{
    const response = await api.get('/api/blogs')
    response.body.forEach((post) => {
      expect(post.id).toBeDefined()
    })
  })})

describe('addition of a new post',()=>{
  test('POST requests are done correctly', async () =>{
    const newBlog = {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    const blogsAtEnd = await api.get('/api/blogs')

    expect(blogsAtEnd.body).toHaveLength(initialNotes.length+1)
    expect(blogsAtEnd.body.map((post)=>post.title)).toContain('React patterns')
  })

  test('Likes are missing form the request', async () =>{
    const newBlogWithoutLikes = {_id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      __v: 0}
    await api
      .post('/api/blogs')
      .send(newBlogWithoutLikes)
      .expect(201)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(initialNotes.length+1)
  })

  test('title or author is missing from the request', async () =>{
    const newBlogWithoutAuthor = 
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlogWithoutAuthor)
      .expect(400)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(initialNotes.length)
  })
})
describe('deletion of a post',()=>{
  test('succed with status code 204 if id is valid',async()=>{
    await api
      .delete('/api/blogs/5a422aa71b54a676234d17f8')
      .expect(204)
      
    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(initialNotes.length - 1)
  })
})

describe('update of a post',()=>{
  test('succed with status code 200 if id is valid',async()=>{
    const blogToUpdate = 
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0
    }
    await api
      .put('/api/blogs/5a422aa71b54a676234d17f8')
      .send(blogToUpdate)
      .expect(200)

    const blogsAtEnd = await api.get('/api/blogs')
    expect(blogsAtEnd.body).toHaveLength(initialNotes.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})