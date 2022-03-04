import React,{ useState} from "react"
import {useParams, Navigate} from "react-router-dom"
import PropTypes from "prop-types"
import blogService from "../services/blogs"
import {deleteBlog, addLikes, updateComment} from "../reducers/blogReducers"
import {useDispatch} from "react-redux"

export const BlogView = (props) => {  
  const dispatch = useDispatch()
  const {user, notification, blogs} = props
  const id = useParams().id
  const [comment, setComment] = useState("")
  const blog = blogs.find(blog => String(blog.id) === String(id))
  console.log(comment)  
  if (!blog) {
    return <Navigate to='/'/>
  }
  // tenes que hacer esto en un dispatch y que modifique el objeto que estas 
  // pasandole por params y que devuelva un nuevo state

  const handleAddLike = async () => {
    try {
      const blogToUpdate = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blogToUpdate)
      dispatch(addLikes(blogToUpdate))
      notification("added like", "success")
    } catch (err) {
      console.log(err)
      notification("couldn't update likes", "error")
    }
  }

  const userIsCreator = blog.user[0].username === user.username

  const handleDelete = async () => {
    const blogToDelete = blog
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      try {
        await blogService.deleteBlog(blogToDelete.id)
        dispatch(deleteBlog(blogToDelete.id))
        notification("succesfuly deleted blog", "success")
        return <Navigate to="/"/>
      } catch (err) {
        console.log(err)
        notification("couldn't delete blog", "error")
      }
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault()
    const newBlog = {...blog, comments: blog.comments.concat(comment)}
    console.log(newBlog)
    try {
      await blogService.updateComment(newBlog)
      dispatch(updateComment(newBlog))
      notification("succesfuly added comment", "success")
      setComment("")
    } catch (err) {
      console.log(err)
      notification("couldn't add comment", "error")
    }
  }
  return (
    <>
      <p>{blog.title}</p>
      <a className='blogUrl' href={blog.url}>url: {blog.url}</a>
      <p className='blogLikes'>
      likes: {blog.likes} <button onClick={handleAddLike}>like</button>
      </p>
      <p>{blog.user[0].username}</p>
      {userIsCreator ? <button onClick={handleDelete}>delete</button> : <></>}
      <h2>Comments</h2>
      <ul>
        {blog.comments.map((comment,i) => <li key={i}>{comment}</li>)}
      </ul>
      <form onSubmit={handleAddComment}>
        <input
          type="text" 
          value={comment}
          name='Comment'
          onChange={({ target }) => setComment(target.value)}
        />
        <button>submit</button>
      </form>
    </>
  )
}

export default BlogView
  
BlogView.propTypes = {
  blogs: PropTypes.array,
  user: PropTypes.object,
  notification: PropTypes.func,
  deleteBlog: PropTypes.func,
  addLikes: PropTypes.func,
}