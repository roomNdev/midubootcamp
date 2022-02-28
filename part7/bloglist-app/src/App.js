import React, { useState, useEffect } from "react"

import ConnectedBlogs from "./components/Bloglist"
import { LoginForm } from "./components/LoginForm"
import NewBlog from "./components/NewBlog"
import { Notification } from "./components/Notification"
import { Togglable } from "./components/Togglable"

import { getAll, setBlogs, } from "./reducers/blogReducers"
import { useSelector ,useDispatch } from "react-redux"
import {setUser} from "./reducers/userReducers"

import blogService from "./services/blogs"

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const [errorMessage, setErrorMessage] = useState({})

  const notification = (message, type) => {
    setErrorMessage({ message, type })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  useEffect(() => {
    console.log(blogs)
    dispatch(getAll())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(newUser))
      blogService.setToken(newUser.token)
    }
  }, [])

  const handlelogOut = () => {
    window.localStorage.removeItem("loggedNoteappUser")
    dispatch(setUser(null))
  }

  return (
    <div>
      {user === null ? (
        <>
          <Notification message={errorMessage} />
          <LoginForm notification={notification} setUser={setUser} />
        </>
      ) : (
        <>
          <Notification message={errorMessage} />
          <p>
            logged as {user.username}{" "}
            <button onClick={handlelogOut}>log out</button>
          </p>
          <Togglable buttonLabel='Create a new blog'>
            <NewBlog
              setBlogs={setBlogs}
              notification={notification}
              blogs={blogs}
            />
          </Togglable>
          <h2>blogs</h2>
          <div>
            <ConnectedBlogs notification={notification}/>
          </div>
        </>
      )}
    </div>
  )
}

export default App
