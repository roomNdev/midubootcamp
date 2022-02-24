import { connect } from "react-redux"
import {createNote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = (props)=>{
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    anecdoteService
      .createNew(content)
      .then(res =>{
        props.createNote(res)
        props.setNotification(`created '${content}'`,5)
      })
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
const mapDispatchToProps = {
  createNote,
  setNotification
}
const connectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)
(AnecdoteForm)

export default connectedAnecdoteForm 