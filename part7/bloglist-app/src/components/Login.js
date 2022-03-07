import React from "react"
import PropTypes from "prop-types"
import { Notification } from "./Notification"
import { LoginForm } from "./LoginForm"

export const Login = ({errorMessage, notification, setUser}) =>{
  return(
    <>
      <Notification message={errorMessage} />
      <div className="flex justify-center">
        <LoginForm notification={notification} setUser={setUser} />
      </div>
    </>
  )
}
 
Login.propTypes = {
  errorMessage: PropTypes.object,
  notification: PropTypes.func,
  setUser: PropTypes.func
}