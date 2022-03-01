import React from "react"
import PropTypes from "prop-types"
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from "react-router-dom"
import {useSelector} from "react-redux"

import Userlist from "./Userlist"
import { UserDisplay } from "./UserDisplay"
import {Login} from "./Login"
import {Home} from "./Home"
import {BlogView} from "./BlogView"
  
export const Menu = ({errorMessage,
  notification,
  setUser,
  handlelogOut,
  setBlogs,
  blogs}) => {
  const users = useSelector(state => state.users)
  const user = useSelector(state => state.user)
  console.log(user)
  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/users">Users</Link>
      <Routes>
        <Route path="/" element={
          user === null
            ? <Login
              errorMessage={errorMessage}
              notification={notification}
              setUser={setUser}/>
            : <Home
              errorMessage={errorMessage} 
              setUser={setUser}
              handlelogOut={handlelogOut}
              setBlogs={setBlogs}
              notification={notification}
              blogs={blogs}
              user={user}/>
        }></Route>
        <Route path="/login" element={
          <Login
            errorMessage={errorMessage}
            notification={notification}
            setUser={setUser}/>}>
        </Route>
        <Route path="/users" element={<Userlist/>}></Route>
        <Route path="/users/:id" element={<UserDisplay users={users}/>} />
        <Route path="/blogs/:id" element={<BlogView
          blogs={blogs}
          user={user} 
          notification={notification}/>}
        />
      </Routes>
    </Router>
  )
}

Menu.propTypes = {
  errorMessage: PropTypes.object,
  notification: PropTypes.func,
  setUser: PropTypes.func,
  handlelogOut: PropTypes.func,
  setBlogs: PropTypes.func,
  blogs: PropTypes.array
}