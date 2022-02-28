import PropTypes from "prop-types"
import React from "react"
import Blog from "./Blog"
import {deleteBlog } from "../reducers/blogReducers"
import { connect } from "react-redux"

const Bloglist = (props)=>{
  const blogs = props.blogs
  const user = props.user
  return (
    <>{blogs === [] ?
      <p>loading...</p> :
      blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <Blog
            id='blog'
            key={blog.id}
            blog={blog}
            allBlogs={blogs}
            deleteBlog={deleteBlog}
            user={user}
            notification={props.notification}>
          </Blog>
        ))}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
  }
}
const ConnectedBlogs = connect(mapStateToProps)(Bloglist)
export default ConnectedBlogs

Bloglist.propTypes = {
  blogs: PropTypes.array,
  user: PropTypes.object,
  notification: PropTypes.func
}