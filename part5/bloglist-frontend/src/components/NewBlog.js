import PropTypes from 'prop-types'
import React,{useState} from 'react'
import blogService from '../services/blogs'

const NewBlog = ({handleNewBlog}) =>{
    
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  
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
    handleNewBlog: PropTypes.func.isRequired
}