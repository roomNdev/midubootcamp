import {login} from "../services/login"
import blogService from "../services/blogs"

const userReducer = (state={}, action) => {
  switch (action.type) {
  case "@user/set_user":
    return action.data
  default:
    return state
  }
}

export default userReducer

export const logIn = (user)=>{
  return async dispatch => {
    const {username, password} = user
    const res = await login({username,password,})
    window.localStorage.setItem("loggedNoteappUser", JSON.stringify(res))
    blogService.setToken(res)
  
    dispatch(setUser(res))
  }
}

export const setUser = (data) =>{
  return async dispatch => {
    dispatch({
      type: "@user/set_user",
      data: data
    })
  }
}
