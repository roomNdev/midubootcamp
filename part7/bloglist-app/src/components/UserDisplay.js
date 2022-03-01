import React from "react"
import {useParams} from "react-router-dom"
import PropTypes from "prop-types"

export const UserDisplay = ({users})=>{  
  const id = useParams().id
  const user = users.find(user => String(user.id) === String(id))
  if (!user) {
    return <p>cannot find user</p>
  }
  return (
    <>
      <h1>{user.username}</h1>
      <p>{user.name ? user.name : ""}</p>
      <p>Blogs created</p>
      <ul>
        {user.blogs.map(blog => 
          <li key={blog.id}>{blog.title}</li>
        )
        }
      </ul>
    </>
  )
}

UserDisplay.propTypes = {
  users: PropTypes.array
}