import React, { useState, useEffect } from "react"
import {Menu} from "./components/Menu"

import { getAll, setBlogs, } from "./reducers/blogReducers"
import { useSelector ,useDispatch } from "react-redux"
import {setUser} from "./reducers/userReducers"

import { Notification } from "./components/Notification"

import blogService from "./services/blogs"
import { Navigate } from "react-router-dom"

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
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser")
    if (loggedUserJSON) {
      const newUser = JSON.parse(loggedUserJSON)
      dispatch(setUser(newUser))
      blogService.setToken(newUser.token)
    }
  }, [dispatch])
  
  const handlelogOut = () => {
    window.localStorage.removeItem("loggedNoteappUser")
    dispatch(setUser(null))
    return<Navigate to="/login"/>
  }

  return (
    <div>
      {user === null
        ? <p>loading...</p>
        :
        <><Notification message={errorMessage} />
          <p>logged as {user.username}{" "}
            <button onClick={handlelogOut}>log out</button>
          </p>
          <Menu
            errorMessage={errorMessage}
            notification={notification}
            setUser={setUser}
            setBlogs={setBlogs}
            blogs={blogs}
            user={user}
          />
        </>
      }
    </div>
  )
}

export default App
