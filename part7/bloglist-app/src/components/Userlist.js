import React,{useEffect} from "react"
import PropTypes from "prop-types"
import {getAllUsers} from "../reducers/allUsersReducer"
import {connect} from "react-redux"
import {Link, } from "react-router-dom"

const Userlist = (props)=>{
  useEffect(()=>{
    props.getAllUsers()
  },[])
  
  const users = props.users

  return(
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <td>users</td>
            <td><strong>blogs created</strong></td>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  getAllUsers,
}

const ConnectedUsers = connect(
  mapStateToProps,
  mapDispatchToProps
)(Userlist)

export default ConnectedUsers

Userlist.propTypes = {
  users: PropTypes.array,
  getAllUsers: PropTypes.func
}