import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import {LoginForm} from './components/LoginForm'
import { NewBlog } from './components/NewBlog'
import {Notification} from './components/Notification'
import {Togglable} from './components/Togglable'

import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [errorMessage, setErrorMessage] = useState({})

  const [user, setUser] = useState(null)

  const notification = (message, type) => {
    setErrorMessage({message, type})
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

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


  const handlelogOut = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  return (
    <div>
      {user === null ?
      <>
        <Notification message={errorMessage}/>
        <LoginForm notification={notification} setUser={setUser}/> 
      </>:
      <>
        <Notification message={errorMessage}/>
        <p>logged as '{user.username}' <button onClick={handlelogOut}>log out</button></p>
        <Togglable buttonLabel='Create a new blog'>
          <NewBlog
          notification={notification}
          setBlogs={setBlogs}
          blogs={blogs}/>
        </Togglable>
        <h2>blogs</h2>
        {blogs
        .sort((a,b) => b.likes - a.likes)
        .map(blog =>
          <Blog 
          key={blog.id} 
          blog={blog}
          allBlogs={blogs}
          setBlogs={setBlogs} 
          user={user} 
          notification={notification}/>
          )}
      </>
      }
    </div>
  )
}

export default App