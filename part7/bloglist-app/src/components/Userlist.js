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
    <div className="flex flex-col items-center">
      <h1 className="text-5xl m-6">Users</h1>
      <table className="text-2xl my-6">
        <thead>
          <tr className="border-b-2 border-spanishviolet p-2">
            <td className="p-2 border-r-2 border-spanishviolet">user</td>
            <td className="p-2"><strong>blogs created</strong></td>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td className="p-2 border-r-2 border-spanishviolet">
                <Link className="hover:text-pearlypurple" to={`/users/${user.id}`}>{user.username}</Link></td>
              <td className="p-2">{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
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