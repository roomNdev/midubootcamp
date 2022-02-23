
const anecdoteReducer = (state = [], action) => {
switch (action.type) {
  case 'ADD_VOTE':
    return [...state]
  case 'NEW_ANECDOTE':
    return [...state, action.data]
  case 'INIT_ANECDOTES': 
    const newState = state.concat(action.data)
    return newState
  default:
    return state
  }
}

export default anecdoteReducer

export const addVote = (id) => {
  return async (dispatch) => 
    dispatch({
    type: 'ADD_VOTE',
    data: id
  })
}

export const createNote = (data) => {
  return async (dispatch) => 
  dispatch({
    type: 'NEW_ANECDOTE',
    data: {
      content: data.content,
      id: data.id,
      votes: 0
    }
  })
}

export const initAnecdotes =(content)=>{
  return {
    type: 'INIT_ANECDOTES',
    data: content
  }
}