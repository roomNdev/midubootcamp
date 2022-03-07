import React,{ useState} from "react"
import {useParams, Navigate, Link} from "react-router-dom"
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
    <div className="flex flex-col items-center">
      <p className="text-5xl p-4">{blog.title}</p>
      <a className='blogUrl text-2xl p-2 hover:text-pearlypurple' href={blog.url}>url: {blog.url}</a>
      <p className='blogLikes text-2xl'>
      likes: {blog.likes} 
        <button className="ring-2 ring-spanishviolet rounded-xl px-3 text-spanishviolet mx-2 hover:text-pearlypurple hover:ring-pearlypurple" 
          onClick={handleAddLike}>like</button>
      </p>
      <Link className="hover:text-pearlypurple text-xl p-4" to={`/users/${blog.user[0].id}`}>by {blog.user[0].username}</Link>
      {userIsCreator 
        ? <button
          className="ring-2 ring-spanishviolet rounded-xl px-3 text-spanishviolet m-2 hover:text-pearlypurple hover:ring-pearlypurple" 
          onClick={handleDelete}>delete</button>
        : <></>}
      <h2 className="text-4xl my-8 border-t border-spanishviolet py-4" >Comments</h2>
      <ul>
        {blog.comments.map((comment,i) => 
          <li 
            className="list-disc"
            key={i}
          >{comment}</li>)}
      </ul>
      <form onSubmit={handleAddComment} 
        className="flex flex-col items-center"
      >
        <input
          placeholder="write a comment..."
          className="rounded-lg m-3 p-1"
          type="text" 
          value={comment}
          name='Comment'
          onChange={({ target }) => setComment(target.value)}
        />
        <button
          className="ring-2 ring-spanishviolet rounded-xl px-3 text-spanishviolet mx-2 hover:text-pearlypurple hover:ring-pearlypurple" 
        >submit</button>
      </form>
    </div>
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