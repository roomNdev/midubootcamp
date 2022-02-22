import { useDispatch } from "react-redux"
import {createNote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'
import {deleteNotification} from '../reducers/notificationReducer'
import {notification} from './Notification'

export const AnecdoteForm = ()=>{
const dispatch = useDispatch()    
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNote(content))
    dispatch(setNotification(`created '${content}'`))
    notification(dispatch, deleteNotification)
  }
  return(
    <>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button>create</button>
    </form>
    </>
  )
}