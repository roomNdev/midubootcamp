import {login} from "../services/login"
import blogService from "../services/blogs"

const userReducer = (state={}, action) => {
  console.log(action.data)
  console.log(state)
  switch (action.type) {
  case "@user/set_user":
    return action.data
  case "@user/unset_user":
    return state
  default:
    return state
  }
}

export default userReducer

export const logIn = (user)=>{
  return async dispatch => {
    const {username, password} = user
    const res = await login({username,password,})  
    console.log(res)
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

export const logOut = (data) =>{
  return async dispatch => {
    dispatch({
      type: "@user/unset_user",
      data: data
    })
  }
}