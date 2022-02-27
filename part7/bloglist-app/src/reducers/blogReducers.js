import blogService from "../services/blogs"

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case "@blogs/set_blogs":
    return state.concat(action.data)
  case "@blogs/delete_blog":
    return state.filter(n => n.id !== action.data)
  default:
    return state
  }
}

export default blogReducer

export const setBlogs = data => {
  return async dispatch => {
    dispatch({
      type: "@blogs/set_blogs",
      data: data,
    })
  }
}

export const deleteBlog = data => {
  return async dispatch => {
    dispatch({
      type: "@blogs/delete_blog",
      data: data
    })
  }
}

export const getAll = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}
