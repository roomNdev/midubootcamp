import {useDispatch} from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import {Anecdotes} from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import {initAnecdotes} from './reducers/anecdoteReducer'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() =>{
    anecdoteService
      .getAll()
      .then(anecdote => dispatch(initAnecdotes(anecdote)))
  },[dispatch])
  
  return (
    <div>
      <Filter/>
      <Notification/>
      <h2>Anecdotes</h2>
      <Anecdotes/>
      <AnecdoteForm/>
    </div>
  )
}

export default App