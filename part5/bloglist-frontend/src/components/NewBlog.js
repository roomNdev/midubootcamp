import PropTypes from 'prop-types'
import React,{useState} from 'react'
import blogService from '../services/blogs'

const NewBlog = ({notification,setBlogs, blogs}) =>{
    
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
        notification("Couldn't create a new blog", 'error')
      }
  } 

    return(
        <form onSubmit={handleNewBlog}>
            <p>title: <input 
                type="text"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
            /></p>
            <p>author: <input 
                type="text"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
            /></p>
            <p>url: <input 
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
  notification: PropTypes.func.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
}