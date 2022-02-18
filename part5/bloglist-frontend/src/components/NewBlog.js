import PropTypes from 'prop-types'
import React,{useState} from 'react'
import blogService from '../services/blogs'

const NewBlog = ({setBlogs,notification,blogs}) =>{
    
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  
  const handleNewBlog = async (event) => {
    event.preventDefault()
    try{
      const newBlog ={
        title,
        author,
        url
      }
      const response = await blogService.create(newBlog)
      notification(`New blog created '${title}' by ${author}`, 'success')
      setBlogs(blogs.concat(response))
      setTitle('')
      setAuthor('')
      setUrl('')
    }
    catch(err) {
      notification('Couldn\'t create a new blog', 'error')
    }
  } 
  
  return(
    <form onSubmit={handleNewBlog} id='create-new-blog-form'>
      <p>title: <input 
        id="title"
        type="text"
        value={title}
        name="title"
        onChange={({ target }) => setTitle(target.value)}
      /></p>
      <p>author: <input 
        id="author"
        type="text"
        value={author}
        name="author"
        onChange={({ target }) => setAuthor(target.value)}
      /></p>
      <p>url: <input 
        id="url"
        type="text"
        value={url}
        name="title"
        onChange={({ target }) => setUrl(target.value)}
      /></p>
      <button type="submit">create</button>
    </form>
  )}

export {NewBlog}

NewBlog.propTypes = {
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  notification: PropTypes.func
}