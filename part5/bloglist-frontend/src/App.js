import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import {LoginForm} from './components/LoginForm'
import { NewBlog } from './components/NewBlog'
import {Notification} from './components/Notification'

import {login} from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [errorMessage, setErrorMessage] = useState({})

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await login({
        username, password,
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setErrorMessage({message: 'Succesfully logged', type:'success'})
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage({message:'Wrong username or password', type:'error'})
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handlelogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()
    try{
      const newBlog ={
        title,
        author,
        url
      }
    const response = await blogService.create(newBlog)
    setErrorMessage({message:`New blog created '${title}' by ${author}`, type: 'success'})
    setBlogs(blogs.concat(response))
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
    }
      catch(err) {
        setErrorMessage({message:"Couldn't create a new blog", type:'error'})
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
  } 

  return (
    <div>
    {user === null 
    ?<>
    <Notification message={errorMessage}/>
    <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/> 
    </>
    : <>
      <Notification message={errorMessage}/>
      <p>logged as '{user.username}' <button onClick={handlelogOut}>log out</button></p>
      <h2>create new</h2>
      <NewBlog title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleNewBlog={handleNewBlog}/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
    }
    </div>
  )
}

export default App