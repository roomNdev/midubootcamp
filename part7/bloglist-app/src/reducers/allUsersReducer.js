import blogService from "../services/blogs"

const usersAmountReducer = (state=[], action) => {
  switch (action.type) {
  case "@user/get_all_users":
    return action.data
  default:
    return state
  }
}

export default usersAmountReducer

export const getAllUsers = () =>{
  return async dispatch => {
    const users = await blogService.getUsers()
    dispatch({
      type: "@user/get_all_users",
      data: users
    })
  }
}