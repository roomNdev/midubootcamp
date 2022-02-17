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

  //this is here and not in the Blog.js file component because of test
  //puroses, anyways it works properly
  const handleAddLike = async() => {
    try {
    const blogToUpdate = {...blog, likes: blog.likes + 1}
    await blogService.update(blogToUpdate)
    setLikes(blogToUpdate.likes)
    notification(`added like`, 'success')
  }
    catch(err) {
      notification(`couldn't update likes`, 'error')
    }
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
    notification(`New blog created '${title}' by ${author}`, 'success')
    setBlogs(blogs.concat(response))
    setTitle('')
    setAuthor('')
    setUrl('')
    }
      catch(err) {
        notification("Couldn't create a new blog", 'error')
      }
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
          handleNewBlog={handleNewBlog}
          />
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
          notification={notification}
          handleAddLike={handleAddLike}/>
          )}
      </>
      }
    </div>
  )
}

export default App