import PropTypes from "prop-types"
import React from "react"
import {Link} from "react-router-dom"

const Blog = ( props) => {
  const { blog, } = props


  return (
    <div className="p-2 ring-1 ring-spanishviolet m-2 rounded-xl bg-pearlypurple text-center w-2/3">
      <Link to={`/blogs/${blog.id}`} className='blogTitle'>{blog.title} |</Link>
      <Link to={`/blogs/${blog.id}`} className='blogAuthor'> {blog.author}</Link>
    </div>
  )
}
export default Blog

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  allBlogs: PropTypes.array,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  notification: PropTypes.func,
}
