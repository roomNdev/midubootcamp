import React from "react"
import PropTypes from "prop-types"
import { Togglable } from "./Togglable"
import NewBlog from "./NewBlog"
import ConnectedBlogs from "./Bloglist"

export const Home = ({ setBlogs, blogs, notification}) =>{


  return (
    <div className="min-h-screen mx-auto flex flex-col items-center">
      <h2 className="text-6xl text-spanishviolet">blogs</h2>
      <Togglable buttonLabel='Create a new blog'>
        <NewBlog
          setBlogs={setBlogs}
          notification={notification}
          blogs={blogs}
        />
      </Togglable>
      <ConnectedBlogs notification={notification}/>
    </div>
  )
}

Home.propTypes = {
  errorMessage: PropTypes.object,
  user: PropTypes.object,
  handlelogOut: PropTypes.func,
  setBlogs: PropTypes.func,
  blogs: PropTypes.array,
  notification: PropTypes.func,
  setUser: PropTypes.func
}