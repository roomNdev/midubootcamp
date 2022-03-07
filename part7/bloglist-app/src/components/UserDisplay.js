import React from "react"
import {useParams, Link} from "react-router-dom"
import PropTypes from "prop-types"

export const UserDisplay = ({users})=>{  
  const id = useParams().id
  const user = users.find(user => String(user.id) === String(id))
  if (!user) {
    return <p>cannot find user</p>
  }
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-5xl p-4">{user.username}</h1>
      <p className="text-2xl p-2">{user.name ? user.name : ""}</p>
      <p className="text-3xl p-4">Blogs created</p>
      <ul>
        {user.blogs.map(blog => 
          <li
            className="list-disc hover:text-pearlypurple"
            key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        )
        }
      </ul>
    </div>
  )
}

UserDisplay.propTypes = {
  users: PropTypes.array
}