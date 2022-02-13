import React from 'react'

const NewBlog = ({title, author, url, setTitle, setAuthor, setUrl, handleNewBlog}) =>(
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
)

export {NewBlog}