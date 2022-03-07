import PropTypes from "prop-types"
import React, { useState } from "react"
import {
  useNavigate
} from "react-router-dom"

import {useDispatch} from  "react-redux"
import {logIn} from "../reducers/userReducers"

const LoginForm = ({ notification }) => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async event => {
    event.preventDefault()
    try {
      await dispatch(logIn({
        username,
        password,
      }))
      notification("Succesfully logged", "success")
      navigate("/")
    } catch (err) {
      console.log(err)
      notification("Wrong username or password", "error")
    }
  }

  return (
    <form onSubmit={handleLogin} className="grid grid-cols-3 grid-rows-3 justify-items-end items-center gap-x-4 w-72 ">
      <p className="text-spanishviolet col-span-1 font-medium my-1 mx-2" >
        username
      </p>
      <input
        id='login-form-input-username'
        type='text'
        value={username}
        name='Username'
        onChange={({ target }) => setUsername(target.value)}
        className="rounded-lg m-3 col-span-2"
      />
      <p className="text-spanishviolet col-span-1 font-medium mx-2" >
        password
      </p>
      <input
        id='login-form-input-password'
        type='password'
        value={password}
        name='Password'
        onChange={({ target }) => setPassword(target.value)}
        className="rounded-lg m-3 col-span-2"
      />
      <button type='submit'
        className="ring-2 ring-spanishviolet rounded-xl p-1 justify-self-center col-span-3 text-spanishviolet font-medium"
      >login</button>
    </form>
  )
}

export { LoginForm }

LoginForm.propTypes = {
  notification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
}
