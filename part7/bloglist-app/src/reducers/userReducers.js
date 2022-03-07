import {login} from "../services/login"
import blogService from "../services/blogs"

const userReducer = (state=null, action) => {
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
    try{
      const {username, password} = user
      const res = await login({username,password,})
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(res))
      blogService.setToken(res)
      dispatch(setUser(res))
      return res
    }
    catch(err) {throw new Error(err)}
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
