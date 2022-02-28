import PropTypes from "prop-types"
import React, { useState } from "react"
import {useDispatch} from  "react-redux"
import {logIn} from "../reducers/userReducers"

const LoginForm = ({ notification }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async event => {
    event.preventDefault()
    try {
      dispatch(logIn({
        username,
        password,
      }))
      notification("Succesfully logged", "success")
      setUsername("")
      setPassword("")
    } catch (exception) {
      console.log(exception)
      notification("Wrong username or password", "error")
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='login-form-input-username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='login-form-input-password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

export { LoginForm }

LoginForm.propTypes = {
  notification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}
