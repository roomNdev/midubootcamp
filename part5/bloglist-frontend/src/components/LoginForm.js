import PropTypes from 'prop-types'
import React,{ useState }from 'react'
import blogService from '../services/blogs'
import {login} from '../services/login'

const LoginForm = ({notification, setUser}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({
        username, password
      })
      setUser(user)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      notification('Succesfully logged', 'success')
      setUsername('')
      setPassword('')
    } catch (exception) {
      notification('Wrong username or password', 'error')
    }
  }
  
  return(
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='login-form-input-username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id='login-form-input-password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )}

export {LoginForm}

LoginForm.propTypes = {
  notification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}