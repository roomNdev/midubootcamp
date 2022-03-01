import PropTypes from "prop-types"
import React from "react"
// import { Togglable } from "./Togglable"
// import blogService from "../services/blogs"
import {Link} from "react-router-dom"

const Blog = ( props) => {
  const { blog, } = props
  // user, notification 
  // const [likes, setLikes] = useState(blog.likes)

  // const handleAddLike = async () => {
  //   try {
  //     const blogToUpdate = { ...blog, likes: blog.likes + 1 }
  //     await blogService.update(blogToUpdate)
  //     setLikes(blogToUpdate.likes)
  //     notification("added like", "success")
  //   } catch (err) {
  //     notification("couldn't update likes", "error")
  //   }
  // }

  // const userIsCreator = blog.user[0].username === user.username

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  // const handleDelete = async () => {
  //   const blogToDelete = blog
  //   if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
  //     try {
  //       await blogService.deleteBlog(blogToDelete.id)
  //       props.deleteBlog(blogToDelete.id)
  //       notification("succesfuly deleted blog", "success")
  //     } catch (err) {
  //       console.log(err)
  //       notification("couldn't delete blog", "error")
  //     }
  //   }
  // }

  return (
    <div style={blogStyle}>
      <Link to={`/blogs/${blog.id}`} className='blogTitle'>{blog.title} </Link>
      <Link to={`/blogs/${blog.id}`} className='blogAuthor'>{blog.author}</Link>
      {/* <Togglable buttonLabel='view'>
        <p className='blogUrl'>url: {blog.url}</p>
        <p className='blogLikes'>
          likes: {likes} <button onClick={handleAddLike}>like</button>
        </p>
        <p>{blog.user[0].username}</p>
        {userIsCreator ? <button onClick={handleDelete}>delete</button> : <></>}
      </Togglable> */}
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
