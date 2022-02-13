import React from 'react'
const Blog = ({blog}) => (
  <div>
    <h2>title: {blog.title} </h2>
    <p>author: {blog.author}</p>
  </div>  
)

export default Blog