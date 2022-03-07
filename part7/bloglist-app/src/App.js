import React, { useState, useEffect } from "react"
import {Menu} from "./components/Menu"
import "tailwindcss/tailwind.css"

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
  }, [dispatch,])

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
    <div className="min-h-screen">
      {user === null
        ? <>
          <Menu
            errorMessage={errorMessage}
            notification={notification}
            setUser={setUser}
            setBlogs={setBlogs}
            blogs={blogs}
            user={user}
          />
        </>
        :<>
          <Notification message={errorMessage} />
          <header className="flex justify-between bg-pearlypurple text-white">
            <p className="w-auto px-3">logged as {user.username}{" "}
            </p>
            <button onClick={handlelogOut} className="w-auto px-3">log out</button>
          </header>
          <div className="min-h-screen">
            <Menu
              errorMessage={errorMessage}
              notification={notification}
              setUser={setUser}
              setBlogs={setBlogs}
              blogs={blogs}
              user={user}
            />
          </div>
        </>
      }
    </div>
  )
}

export default App
